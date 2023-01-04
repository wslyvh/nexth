import * as React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { Button, FormControl, FormLabel, Heading, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { verifyMessage } from 'ethers/lib/utils'
import { SignMessageArgs } from '@wagmi/core'
import { NextSeo } from 'next-seo'

function SignMessage() {
  let [message, setMessage] = useState('')
  let [address, setAddress] = useState('')
  const signMessage = useSignMessage({
    message,
    onSuccess: verify,
  })

  function submit() {
    signMessage.signMessage({ message })
  }

  function verify(data: string, variables: SignMessageArgs) {
    const address = verifyMessage(variables.message, data)
    setAddress(address)
  }

  return (
    <div>
      <Heading as="h3" fontSize="xl" my={4}>
        Sign Message
      </Heading>

      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message to sign" />

        <Button mt={4} type="submit" onClick={submit}>
          Sign
        </Button>

        {signMessage.data && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Signature
            </Heading>
            <p>{signMessage.data}</p>
          </div>
        )}

        {address && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Signed by
            </Heading>
            <p>{address}</p>
          </div>
        )}
      </FormControl>
    </div>
  )
}

export default function SignExample() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return (
      <div>
        <NextSeo title="Sign & verify messages" />
        <Heading as="h2" fontSize="2xl" my={4}>
          Sign & verify messages
        </Heading>
        <p>
          Private keys can be used to sign any kind of messages. This is useful for verifying that a message was sent by a specific account. This is
          also how transactions are (signed and) send to the network.
        </p>

        <SignMessage />
      </div>
    )
  }

  return <div>Connect your wallet first to sign a message.</div>
}
