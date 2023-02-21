import * as React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { Button, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { LinkComponent } from 'components/layout/LinkComponent'

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
  const [score, setScore] = useState<number | undefined>(-1)

  useEffect(() => {
    if (isConnected && address) {
      const getPassport = async () => {
        const response = await fetch(`https://api.scorer.gitcoin.co/registry/score/${COMMUNITY_ID}/${address}`, {
          headers,
        })
        const data = await response.json()

        if (response.status === 200) {
          const score = Number(data.score)
          setMessage('')
          setScore(Math.round(score * 100) / 100)
        } else {
          console.log(data.detail)
          setMessage('')
          setScore(undefined)
        }
      }

      getPassport()
    }
  }, [address, isConnected])

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
        <Heading as="h2" fontSize="2xl" my={4}>
          Gitcoin Passport
        </Heading>
        <p>
          Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.
        </p>

        {message && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Error
            </Heading>
            <p>{message}</p>
          </div>
        )}

        {score === 0 && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Passport Score is 0
            </Heading>
            <p>
              Make sure you have added stamps on <LinkComponent href="https://passport.gitcoin.co/">your passport</LinkComponent>.
            </p>
          </div>
        )}

        {!!score && score > 0 && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Passport Score
            </Heading>
            <p>Your passport score is {score}</p>
          </div>
        )}

        {score === undefined && (
          <div>
            <Heading as="h3" fontSize="xl" my={4}>
              Submit your passport
            </Heading>
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
