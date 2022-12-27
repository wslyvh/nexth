import * as React from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useEffect, useState } from 'react'
import { SITE_NAME } from 'utils/config'
import { Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import { LinkComponent } from 'components/layout/LinkComponent'

function SignInButton({ onSuccess, onError }: { onSuccess: (args: { address: string }) => void; onError: (args: { error: Error }) => void }) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const signIn = async () => {
    try {
      const chainId = chain?.id
      if (!address || !chainId) return

      // 1. Get random nonce from API
      const nonceRes = await fetch('/api/account/nonce')
      const nonce = await nonceRes.text()

      // 2. Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Sign in with Ethereum to ${SITE_NAME}.`,
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: nonce,
      })

      // 3. Sign message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // 3. Verify signature
      const verifyRes = await fetch('/api/account/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      onSuccess({ address })
    } catch (error) {
      onError({ error: error as Error })
    }
  }

  return (
    <div>
      <Heading as="h2" fontSize="2xl" my={4}>
        Sign-In With Ethereum
      </Heading>
      <p>
        Sign-In with Ethereum is a new form of authentication that enables users to control their digital identity with their Ethereum account and ENS
        profile instead of relying on a traditional intermediary.
      </p>

      <UnorderedList>
        <ListItem>
          <LinkComponent href="https://login.xyz/">More info</LinkComponent>
        </ListItem>
        <ListItem>
          <LinkComponent href="https://wagmi.sh/examples/sign-in-with-ethereum">Wagmi Docs</LinkComponent>
        </ListItem>
      </UnorderedList>

      <Heading as="h3" fontSize="xl" my={4}>
        Try it out
      </Heading>
      <p>
        <Button onClick={signIn}>Sign-in With Ethereum</Button>
      </p>
    </div>
  )
}

export default function SiweExample() {
  const { isConnected } = useAccount()
  const [address, setAddress] = useState('')

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/account')
        const json = await res.json()
        if (json.address) {
          setAddress(json.address)
        }
      } catch (_error) {}
    }

    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  async function logout() {
    await fetch('/api/account/logout')
    setAddress('')
  }

  if (isConnected) {
    return (
      <div>
        {address ? (
          <div>
            <div>Signed in as {address}</div>
            <button onClick={logout}>Sign Out</button>
          </div>
        ) : (
          <SignInButton onSuccess={({ address }) => setAddress(address)} onError={({ error }) => setAddress('')} />
        )}
      </div>
    )
  }

  return <div></div>
}
