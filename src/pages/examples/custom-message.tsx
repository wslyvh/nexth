import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'
import { Button, Code, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { messageAddress, messageConfig, readMessage } from 'abis'
import { ETH_CHAINS } from 'utils/config'
import { LinkComponent } from 'components/layout/LinkComponent'

export default function MessageExample() {
  const [message, setMessage] = useState('')
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    async function read() {
      try {
        const data = await readMessage({ functionName: 'message' })
        setMessage(data)
        return
      } catch (e) {
        console.log('Unable to read message', e)
      }

      setMessage('')
    }

    read()
  }, [chain])

  async function switchToNetwork(id?: number) {
    if (switchNetwork && !!id) {
      switchNetwork(id)
    }
  }

  return (
    <div>
      <NextSeo title="Custom Solidity Contract" />
      <HeadingComponent as="h2">Custom Solidity Contract</HeadingComponent>

      <Text>
        This example shows a custom Solidity smart contract deployed using Hardhat. You can find sample contract under <Code>/contracts</Code>.
        Contracts are automatically verified on Etherscan and types and hooks are generated using <Code>wagmi-cli</Code>
      </Text>

      <HeadingComponent as="h3">Deployments</HeadingComponent>
      <Text>Switch to a network where this contract is deployed.</Text>

      <UnorderedList>
        {Object.keys(messageConfig.address).map((i) => {
          const chain = ETH_CHAINS.find((chain: Chain) => String(chain.id) === i)
          const address = (messageAddress as any)[i]
          const explorerUrl = chain?.blockExplorers?.default.url

          return (
            <ListItem key={i}>
              <Button size="xs" mr={2} onClick={() => switchToNetwork(chain?.id)}>
                {chain?.name ?? i}
              </Button>
              {explorerUrl && <LinkComponent href={`${explorerUrl}/address/${address}`}>{address}</LinkComponent>}
              {!explorerUrl && address}
            </ListItem>
          )
        })}
      </UnorderedList>

      {message && (
        <div>
          <HeadingComponent as="h3">Current message</HeadingComponent>
          <p>{message}</p>
        </div>
      )}
    </div>
  )
}
