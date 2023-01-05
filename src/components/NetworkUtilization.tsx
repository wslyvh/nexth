import { Box, Flex, Heading, Progress, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { watchBlockNumber, watchPendingTransactions } from '@wagmi/core'
import { useBlockNumber, useNetwork, useProvider } from 'wagmi'
import { Block } from '@ethersproject/providers'
import { StatsCard } from './StatsCard'
import { LinkComponent } from './LinkComponent'
import { THEME_COLOR_SCHEME } from 'utils/config'
import { Transaction } from 'ethers'
import { TruncateMiddle } from 'utils/strings'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function NetworkUtilization() {
  const provider = useProvider()
  const network = useNetwork()
  const block = useBlockNumber({ watch: true })
  const [nrOfBlocks, setNrOfBlocks] = useState(25)
  const explorerUrl = network.chain?.blockExplorers?.default.url ?? 'https://etherscan.io'
  const bgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.900`)

  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const pendingRef = useRef<Transaction[]>([])
  const [latestBlocksState, setLatestBlocksState] = useState<any>({})
  const blocksRef = useRef<any>({})

  const unwatch = watchBlockNumber({ listen: true }, async (blockNr) => {
    const block = await provider.getBlock(blockNr)
    const blocks = [...toArray(blocksRef.current), block]

    const state = getBlockState(blocks)
    blocksRef.current = state
    setLatestBlocksState(state)
    unwatch()
  })

  const unwatchPending = watchPendingTransactions({}, (transaction: Transaction) => {
    const pendingTransactions = [...pendingRef.current, transaction]

    const unique = pendingTransactions.reduce((acc: Transaction[], tx) => {
      if (!acc.some((transaction: any) => transaction.hash === tx.hash)) {
        if (!toArray(blocksRef.current).some((b) => tx.hash && b.transactions.includes(tx.hash))) {
          acc.push(tx)
        }
      }
      return acc
    }, [])

    pendingRef.current = unique
    setPendingTransactions(unique)
    unwatchPending
  })

  useEffect(() => {
    async function getInitialBlocks() {
      const latest = await provider.getBlock('latest')
      const blocks = await Promise.all([...Array(nrOfBlocks).keys()].map((i) => provider.getBlock(latest.number - i)))

      const state = getBlockState(blocks)
      blocksRef.current = state
      setLatestBlocksState(state)
    }

    getInitialBlocks()
    // todo useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, nrOfBlocks])

  function getBlockState(items: Block[]) {
    const latestBlockItems = items
      .concat(toArray(blocksRef.current))
      .sort((a: Block, b: Block) => b.number - a.number)
      .slice(0, nrOfBlocks * 2)

    return latestBlockItems.reduce((block, item) => {
      return {
        ...block,
        [item.number]: item,
      }
    }, {})
  }

  function toArray(state: any) {
    return Object.keys(state)
      .map((i) => state[i])
      .sort((a: Block, b: Block) => b.number - a.number)
  }

  function AvgNetworkUtilization(state: any) {
    const blocks = toArray(state)
    const items = blocks.map((i) => Math.round((i.gasUsed / i.gasLimit) * 100))
    if (!items.length) return 0

    return Math.round(items.reduce((sum, x) => sum + x, 0) / items.length)
  }

  function maxMinMean(state: any, type: 'baseFeePerGas' | 'gasUsed') {
    const blocks = toArray(state)
    const items = blocks.map((i) => Number(i[type]) / (type === 'baseFeePerGas' ? 1e9 : 1e6))
    if (!items.length) return [0, 0, 0]

    items.sort((a, b) => a - b)
    const results = [Math.round(items.slice(-1)[0]), Math.round(items[0]), Math.round(items.reduce((sum, x) => sum + x, 0) / items.length)]
    return results
  }

  function getColorScheme(value: number) {
    if (value >= 50) return 'green'
    if (value >= 40) return 'yellow'
    if (value >= 20) return 'orange'

    return 'red'
  }

  return (
    <Box>
      <Flex gap={4} justifyContent="space-between" my={4}>
        <Box>
          <Text>Network Utilization: {AvgNetworkUtilization(latestBlocksState)}%</Text>
          <Text fontSize="xs">Last block #{block.data}</Text>
        </Box>
        <Select maxW="150px" onChange={(e) => setNrOfBlocks(Number(e.target.value))}>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </Flex>

      <Flex gap={4} my={4}>
        <StatsCard
          title="⛽ Gas Used"
          items={[
            { title: 'Avg', value: `${maxMinMean(latestBlocksState, 'gasUsed')[2]} M` },
            { title: 'Max', value: `${maxMinMean(latestBlocksState, 'gasUsed')[0]} M` },
            { title: 'Min', value: `${maxMinMean(latestBlocksState, 'gasUsed')[1]} M` },
          ]}
        />
        <StatsCard
          title="💲 Base Fee"
          items={[
            { title: 'Avg', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[2]} Gwei` },
            { title: 'Max', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[0]} Gwei` },
            { title: 'Min', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[1]} Gwei` },
          ]}
        />
      </Flex>

      <Heading as="h3" fontSize="xl">
        Latest Blocks
      </Heading>

      <Box width="100%" maxHeight="300px" overflowX="scroll" overflow="auto" my={4}>
        <Table size="sm" variant="striped">
          <Thead position="sticky" top={0} bgColor={bgColor} zIndex={2}>
            <Tr>
              <Th py={2} minW="100px">
                #
              </Th>
              <Th minW="120px">Time</Th>
              <Th minW="140px" isNumeric>
                Gas Used
              </Th>
              <Th minW="100px" isNumeric>
                Base Fee
              </Th>
              <Th minW="60px" isNumeric>
                Txn
              </Th>
              <Th isNumeric>Miner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {toArray(latestBlocksState).map((i) => {
              return (
                <Tr key={`TR_${i.number}`}>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/block/${i.number}`}>{i.number}</LinkComponent>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{dayjs(i.timestamp * 1000).fromNow(true)}</Text>
                  </Td>
                  <Td>
                    <Flex flexDirection="column">
                      <Text>
                        {Math.round(i.gasUsed / 1e6)} M{' '}
                        <Text as="span" fontSize="xs" float="right">
                          {Math.round((i.gasUsed / i.gasLimit) * 100)}%
                        </Text>
                      </Text>
                      <Progress
                        size="xs"
                        value={Math.round((i.gasUsed / i.gasLimit) * 100)}
                        colorScheme={getColorScheme(Math.round((i.gasUsed / i.gasLimit) * 100))}
                        hasStripe
                      />
                    </Flex>
                  </Td>
                  <Td isNumeric>{Math.round(i.baseFeePerGas / 1e9)} Gwei</Td>
                  <Td isNumeric>{i.transactions.length}</Td>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/address/${i.miner}`}>{i.miner}</LinkComponent>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>

      <Heading as="h3" fontSize="xl">
        Pending Transactions
      </Heading>

      {/* hash, from, nonce, gasLimit, gasPrice, value  */}
      <Box width="100%" maxHeight="300px" overflowX="scroll" overflow="auto" my={4}>
        <Table size="sm" variant="striped">
          <Thead position="sticky" top={0} bgColor={bgColor} zIndex={2}>
            <Tr>
              <Th py={2}>Hash</Th>
              <Th>From</Th>
              <Th minW="60px" isNumeric>
                Nonce
              </Th>
              <Th minW="100px" isNumeric>
                Gas Limit
              </Th>
              <Th minW="100px" isNumeric>
                Gas Price
              </Th>
              <Th minW="100px">Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingTransactions.map((i) => {
              return (
                <Tr key={`TR_${i.hash}`}>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/tx/${i.hash}`}>{TruncateMiddle(i.hash)}</LinkComponent>
                  </Td>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/address/${i.from}`}>{i.from}</LinkComponent>
                  </Td>
                  <Td isNumeric>{i.nonce}</Td>
                  <Td isNumeric>{i.gasLimit.toString()}</Td>
                  <Td isNumeric>
                    {i.maxFeePerGas && `${Math.round(Number(i.maxFeePerGas) / 1e9)} | ${Math.round(Number(i.maxPriorityFeePerGas) / 1e9)} Gwei`}
                    {!i.maxFeePerGas && i.gasPrice && `${Math.round(Number(i.gasPrice) / 1e9)} Gwei`}
                  </Td>
                  <Td isNumeric>{Math.round(Number(i.value) / 1e18)} Ether</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
