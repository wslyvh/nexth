import { useAccount, useSignMessage } from 'wagmi'
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { verifyMessage } from 'viem'
import { SignMessageArgs } from '@wagmi/core'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'

function SignMessage() {
  const account = useAccount()
  let [message, setMessage] = useState('')
  let [address, setAddress] = useState('')
  const signMessage = useSignMessage({
    message,
    onSuccess: verify,
  })

  function submit() {
    signMessage.signMessage({ message })
  }

  async function verify(data: `0x${string}`, variables: SignMessageArgs) {
    if (!account.address) return

    const verified = await verifyMessage({
      address: account.address,
      message: variables.message,
      signature: data,
    })

    if (verified) setAddress(account.address)
  }

  return (
    <div>
      <HeadingComponent as="h3">Sign Message</HeadingComponent>

      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message to sign" />

        <Button mt={4} type="submit" onClick={submit}>
          Sign
        </Button>

        {signMessage.data && (
          <div>
            <HeadingComponent as="h3">Signature</HeadingComponent>
            <p>{signMessage.data}</p>
          </div>
        )}

        {address && (
          <div>
            <HeadingComponent as="h3">Signed by</HeadingComponent>
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
        <HeadingComponent as="h2">Sign & verify messages</HeadingComponent>
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
