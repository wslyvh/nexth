import { fetchEnsAddress, fetchEnsName } from '@wagmi/core'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'

function FetchENS() {
  let [status, setStatus] = useState<'idle' | 'fetching'>('idle')
  let [input, setInput] = useState('')
  let [resolved, setResolved] = useState('')

  async function submit() {
    try {
      setStatus('fetching')
      if (input.endsWith('.eth')) {
        let resolvedENS = await fetchEnsAddress({
          name: input,
        })
        setResolved(String(resolvedENS))
      } else {
        let resolvedAddress = await fetchEnsName({
          address: input as `0x{string}`,
        })
        setResolved(String(resolvedAddress))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div>
      <HeadingComponent as="h3">Fetch ENS Address</HeadingComponent>

      <FormControl>
        <FormLabel>ENS Name/Address</FormLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a ENS Name/Address" />

        <Button mt={4} type="submit" onClick={submit} disabled={status === 'fetching'}>
          {status === 'idle' ? 'Fetch' : 'Fetching...'}
        </Button>

        {resolved && (
          <div>
            <HeadingComponent as="h3">Resolved Value</HeadingComponent>
            <p>{resolved}</p>
          </div>
        )}
      </FormControl>
    </div>
  )
}

export default function ENSExample() {
  return (
    <div>
      <NextSeo title="Fetch ENS Address" />
      <HeadingComponent as="h2">Fetch ENS Address</HeadingComponent>
      <p>
        This example demonstrates how to use the Ethereum Name Service (ENS) to resolve human-readable names to Ethereum addresses. ENS is a
        decentralized domain name system that allows users to register and map domain names to Ethereum addresses.
      </p>
      <FetchENS />
    </div>
  )
}
