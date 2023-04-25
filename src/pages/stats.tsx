import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  StatArrow,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { passportAddress } from 'abis'
import { Pagination } from 'components/Pagination'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

interface Token {
  tokenId: string
  owner: string
  score: number
}

interface Stats {
  tokens: number
  min: number
  max: number
}

export default function Stats() {
  const defaultPageSize = 25
  const bgColor = useColorModeValue(`gray.200`, `gray.900`)
  const { chain } = useNetwork()
  const chainId: 10 | 11155111 = (chain?.id as any) ?? 10
  const [tokens, setTokens] = useState<Token[]>([])
  const [stats, setStats] = useState<Stats>()
  const [orderBy, setOrderBy] = useState('tokenId')
  const [orderDirection, setOrderDirection] = useState('asc')
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    async function getTokens() {
      const response = await fetch('https://api.thegraph.com/subgraphs/name/wslyvh/gitcoin-passport-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            globals(first: 1) {
              tokens
            }
            min: tokens (first: 1 orderBy: score) {
              tokenId
              owner
              score
            }
            max: tokens (first: 1 orderBy: score orderDirection: desc) {
              tokenId
              owner
              score
            }
            tokens(first: ${defaultPageSize} skip: ${skip} orderBy: ${orderBy} orderDirection: ${orderDirection}) {
              tokenId
              owner
              score
            }
          }`,
        }),
      })

      const body = await response.json()

      if (body.data) {
        setTokens(body.data.tokens)
        setStats({
          tokens: body.data.globals[0].tokens,
          min: body.data.min[0].score,
          max: body.data.max[0].score,
        })
      }
    }

    getTokens()
  }, [orderBy, orderDirection, skip])

  function onSelectPagination(nr: number) {
    const skip = (nr - 1) * defaultPageSize
    setSkip(skip)
  }

  function order(orderBy: string) {
    setOrderBy(orderBy)
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">Gitcoin Passport Score</HeadingComponent>
      </main>

      {stats && (
        <Flex gap={4}>
          <Card w="100%">
            <CardBody>
              <Stat>
                <StatLabel>Tokens</StatLabel>
                <StatNumber>{stats.tokens}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card w="100%">
            <CardBody>
              <Stat>
                <StatLabel>Highest</StatLabel>
                <StatNumber>
                  <Flex alignItems="center" gap={2}>
                    {stats.max}
                    <StatArrow type="increase" />
                  </Flex>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card w="100%">
            <CardBody>
              <Stat>
                <StatLabel>Lowest</StatLabel>
                <StatNumber>
                  <Flex alignItems="center" gap={2}>
                    {stats.min}
                    <StatArrow type="decrease" />
                  </Flex>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </Flex>
      )}

      <Box width="100%" overflowX="scroll" overflow="auto" my={4}>
        <Table size="sm" variant="striped">
          <Thead position="sticky" top={0} bgColor={bgColor} zIndex={2}>
            <Tr>
              <Th py={2} isNumeric onClick={() => order('tokenId')} _hover={{ cursor: 'pointer' }}>
                Token ID
              </Th>
              <Th py={2} onClick={() => order('owner')} _hover={{ cursor: 'pointer' }}>
                Owner
              </Th>
              <Th py={2} isNumeric onClick={() => order('score')} _hover={{ cursor: 'pointer' }}>
                Score
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokens.map((i: any) => {
              return (
                <Tr key={`TR_${i.tokenId}`}>
                  <Td isNumeric>
                    <LinkComponent href={`https://qx.app/asset/${passportAddress[chainId]}/${i.tokenId}`}>{i.tokenId}</LinkComponent>
                  </Td>
                  <Td>
                    <LinkComponent href={`${chain?.blockExplorers?.default.url}/address/${i.owner}`}>{i.owner}</LinkComponent>
                  </Td>
                  <Td isNumeric>{i.score}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>

      {stats && (
        <Box>
          <Pagination
            itemsPerPage={defaultPageSize}
            totalItems={stats?.tokens}
            selectedPage={Math.round(skip / defaultPageSize + 1)}
            onSelectPage={onSelectPagination}
            truncate={true}
          />
        </Box>
      )}
    </>
  )
}
