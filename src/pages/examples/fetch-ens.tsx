import { useEnsAddress, useEnsName } from 'wagmi'
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'

function FetchENS() {
  let [input, setInput] = useState('')
  let [resolved, setResolved] = useState('')

  const resolveAddress = useEnsName({
    address: input as `0x${string}`,
    enabled: false,
    onSuccess(data) {
      setResolved(String(data))
    },
  })

  const resolveEns = useEnsAddress({
    name: input,
    enabled: false,
    onSuccess(data) {
      setResolved(String(data))
    },
  })

  function submit() {
    if (input.endsWith('.eth')) {
      resolveEns.refetch()
    } else {
      resolveAddress.refetch()
    }
  }

  return (
    <div>
      <HeadingComponent as="h3">Fetch ENS Address</HeadingComponent>

      <FormControl>
        <FormLabel>ENS Name</FormLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a ENS Name/Address" />

        <Button mt={4} type="submit" onClick={submit}>
          Fetch
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
