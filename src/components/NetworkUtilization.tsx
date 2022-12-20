import { Box, Flex, Progress, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { watchBlockNumber } from '@wagmi/core'
import { useBlockNumber, useNetwork, useProvider } from 'wagmi'
import { Block } from '@ethersproject/providers'
import { StatsCard } from './StatsCard'
import { LinkComponent } from './LinkComponent'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { THEME_COLOR_SCHEME } from 'utils/config'
dayjs.extend(relativeTime)

const maxBlocks = 25

export function NetworkUtilization() {
  const provider = useProvider()
  const network = useNetwork()
  const block = useBlockNumber({ watch: true })
  const [latestBlocksState, setLatestBlocksState] = useState<any>({})
  const blocksRef = useRef<any>({})
  const explorerUrl = network.chain?.blockExplorers?.default.url ?? 'https://etherscan.io'
  const bgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.900`)

  const unwatch = watchBlockNumber({ listen: true }, async (blockNr) => {
    const block = await provider.getBlock(blockNr)
    const blocks = [...toArray(blocksRef.current), block]

    const state = getBlockState(blocks)
    blocksRef.current = state
    setLatestBlocksState(state)
    unwatch()
  })

  useEffect(() => {
    async function getInitialBlocks() {
      const latest = await provider.getBlock('latest')
      const blocks = await Promise.all([...Array(maxBlocks).keys()].map((i) => provider.getBlock(latest.number - i)))

      const state = getBlockState(blocks)
      blocksRef.current = state
      setLatestBlocksState(state)
    }
    getInitialBlocks()
  }, [])

  function getBlockState(items: Block[]) {
    const latestBlockItems = items
      .concat(toArray(blocksRef.current))
      .sort((a: Block, b: Block) => b.number - a.number)
      .slice(0, maxBlocks * 2)

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

  function maxMinMean(state: any, type: 'baseFeePerGas' | 'gasUsed') {
    const blocks = toArray(state)
    const items = blocks.map((i) => Number(i[type]) / (type === 'baseFeePerGas' ? 1e9 : 1e6))
    if (!items.length) return [0, 0, 0]

    items.sort((a, b) => a - b)
    const results = [Math.round(items.slice(-1)[0]), Math.round(items[0]), Math.round(items.reduce((sum, x) => sum + x, 0) / items.length)]
    return results
  }

  return (
    <Box>
      <Flex gap={4}>
        <StatsCard
          title="⛽ Gas Used"
          items={[
            { title: 'Average', value: `${maxMinMean(latestBlocksState, 'gasUsed')[2]} M` },
            { title: 'Max', value: `${maxMinMean(latestBlocksState, 'gasUsed')[0]} M` },
            { title: 'Min', value: `${maxMinMean(latestBlocksState, 'gasUsed')[1]} M` },
          ]}
        />
        <StatsCard
          title="💲 Base Fee"
          items={[
            { title: 'Average', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[2]} Gwei` },
            { title: 'Max', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[0]} Gwei` },
            { title: 'Min', value: `${maxMinMean(latestBlocksState, 'baseFeePerGas')[1]} Gwei` },
          ]}
        />
      </Flex>

      <Text fontSize="xs" float="right" my={4}>
        Last block #{block.data} (last {maxBlocks})
      </Text>

      <Box width="100%" maxHeight="300px" overflowX="scroll" overflow="auto">
        <Table size="sm" variant="striped">
          <Thead position="sticky" top={0} bgColor={bgColor} zIndex={2}>
            <Tr>
              <Th py={2} minW="100px">
                #
              </Th>
              <Th minW="120px">Time</Th>
              <Th minW="100px" isNumeric>
                Base Fee
              </Th>
              <Th minW="140px" isNumeric>
                Gas Used
              </Th>
              <Th isNumeric>Miner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {toArray(latestBlocksState).map((i) => {
              return (
                <Tr>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/block/${i.number}`}>{i.number}</LinkComponent>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{dayjs(i.timestamp * 1000).fromNow(true)}</Text>
                  </Td>
                  <Td isNumeric>{Math.round(i.baseFeePerGas / 1e9)} Gwei</Td>
                  <Td>
                    <Flex flexDirection="column">
                      <p>{Math.round(i.gasUsed / 1e6)} M</p>
                      <Progress size="xs" value={Math.round((i.gasUsed / i.gasLimit) * 100)} hasStripe />
                    </Flex>
                  </Td>
                  <Td textDecoration="underline">
                    <LinkComponent href={`${explorerUrl}/address/${i.miner}`}>{i.miner}</LinkComponent>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
