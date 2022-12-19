import { Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { watchBlockNumber } from '@wagmi/core'
import { useProvider } from 'wagmi'
import { Block } from '@ethersproject/providers'
import { StatsCard } from './StatsCard'

const maxBlocks = 25

export function NetworkUtilization() {
  const provider = useProvider()
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
    return Object.keys(state).map((i) => state[i])
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
  )
}
