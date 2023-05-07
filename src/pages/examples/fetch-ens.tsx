import { useEnsAddress } from 'wagmi'
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'

function FetchENS() {
  let [name, setName] = useState('')
  let [ensAddress, setEnsAddress] = useState('')
  const ens = useEnsAddress({
    name: name,
    enabled: false,
    onSuccess(data) {
      setEnsAddress(String(data))
    },
  })

  function submit() {
    ens.refetch()
  }

  return (
    <div>
      <HeadingComponent as="h3">Fetch ENS Address</HeadingComponent>

      <FormControl>
        <FormLabel>ENS Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a ENS Name" />

        <Button mt={4} type="submit" onClick={submit}>
          Fetch
        </Button>

        {ensAddress && (
          <div>
            <HeadingComponent as="h3">Address</HeadingComponent>
            <p>{ensAddress}</p>
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
