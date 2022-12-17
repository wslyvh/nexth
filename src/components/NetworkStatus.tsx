import React from 'react'
import { Badge, Flex, Text } from '@chakra-ui/react'
import { useBlockNumber, useNetwork } from 'wagmi'
import { GetNetworkColor } from 'utils/network'
import { LinkComponent } from './LinkComponent'
import { useIsMounted } from 'hooks/useIsMounted'

export function NetworkStatus() {
  const isMounted = useIsMounted()
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url

  if (!isMounted) return null

  return (
    <Flex alignItems="center" gap={2}>
      <Badge colorScheme={GetNetworkColor(network.chain?.network)} fontSize="2xs">
        {network.chain?.name ?? 'Ethereum'}
      </Badge>

      {explorerUrl && (
        <LinkComponent href={explorerUrl}>
          <Text fontSize="2xs"># {block.data}</Text>
        </LinkComponent>
      )}
      {!explorerUrl && <Text fontSize="2xs"># {block.data}</Text>}
    </Flex>
  )
}
