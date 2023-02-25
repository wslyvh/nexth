import { useAccount, useSigner } from 'wagmi'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { LinkComponent } from 'components/layout/LinkComponent'
import { usePassportScore } from 'hooks/usePassportScore'
import { HeadingComponent } from 'components/layout/HeadingComponent'

const COMMUNITY_ID = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_COMMUNITY_ID
const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY

const headers = API_KEY
  ? {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    }
  : undefined

export default function PassportExample() {
  const { data: signer } = useSigner()
  const { address, isConnected } = useAccount()
  const [message, setMessage] = useState('')
  const { loading, data: score, error } = usePassportScore()

  async function submit() {
    if (!signer) return

    // Get nonce from Gitcoin
    const signResponse = await fetch(`https://api.scorer.gitcoin.co/registry/signing-message`, {
      headers,
    })
    const { message, nonce } = await signResponse.json()

    // Sign message
    let signature: string
    try {
      signature = await signer.signMessage(message)
    } catch (e) {
      setMessage('Unable to sign message')
      return
    }

    // Submit Passport to Gitcoin
    const response = await fetch(`https://api.scorer.gitcoin.co/registry/submit-passport`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        address,
        community: COMMUNITY_ID,
        signature,
        nonce,
      }),
    })

    if (response.status !== 200) {
      setMessage('Unable to submit passport')
      return
    }
  }

  if (isConnected) {
    return (
      <div>
        <NextSeo title="Gitcoin Passport" />
        <HeadingComponent as="h2">Gitcoin Passport</HeadingComponent>

        <p>
          Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.
        </p>

        <Text my={4}>
          If you fork this repo, you need to create your project and API keys at{' '}
          <LinkComponent href="https://scorer.gitcoin.co/">Gitcoin Scorer</LinkComponent>. <br />
          Then, add your API key and community ID to your .env variables.
        </Text>

        {message && (
          <div>
            <HeadingComponent as="h3">Error</HeadingComponent>
            <p>{message}</p>
          </div>
        )}

        {!loading && score === 0 && (
          <div>
            <HeadingComponent as="h3">Passport Score is 0</HeadingComponent>
            <p>
              Make sure you have added stamps on <LinkComponent href="https://passport.gitcoin.co/">your passport</LinkComponent>.
            </p>
          </div>
        )}

        {!loading && !!score && score > 0 && (
          <div>
            <HeadingComponent as="h3">Passport Score</HeadingComponent>
            <p>Your passport score is {score.toString()}</p>
          </div>
        )}

        {!loading && score === undefined && (
          <div>
            <HeadingComponent as="h3">Submit your passport</HeadingComponent>
            <p>
              No score available. Make sure to <LinkComponent href="https://passport.gitcoin.co/">create your passport</LinkComponent> before
              submitting your passport.
            </p>
            <p>
              <Button mt={4} type="submit" onClick={submit}>
                Submit
              </Button>
            </p>
          </div>
        )}
      </div>
    )
  }

  return <div>Connect your wallet first to verify your passport.</div>
}
