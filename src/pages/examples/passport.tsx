import { useAccount } from 'wagmi'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { LinkComponent } from 'components/layout/LinkComponent'
import { usePassportScore } from 'hooks/passport/usePassportScore'
import { usePassportSubmit } from 'hooks/passport/usePassportSubmit'
import { usePassportStamps } from 'hooks/passport/usePassportStamps'
import { HeadingComponent } from 'components/layout/HeadingComponent'

export default function PassportExample() {
  const { address, isConnected } = useAccount()
  const { loading, data: score, error } = usePassportScore()
  const { submit, submitting, error: submitError } = usePassportSubmit()
  const { loading: loadingStamps, data: stamps, error: stampsError } = usePassportStamps()

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

        {submitError && (
          <div>
            <HeadingComponent as="h3">Error</HeadingComponent>
            <p>{submitError}</p>
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

        {!loadingStamps && !!stamps && stamps.length > 0 && (
          <div>
            <HeadingComponent as="h3">Passport Stamps</HeadingComponent>
            {stamps.map((stamp) => (
              <div>
                <div>Provider: {stamp.credential.credentialSubject.provider}</div>
                <div>IssuanceDate: {stamp.credential.issuanceDate}</div>
                <div>ExpirationDate: {stamp.credential.expirationDate}</div>
              </div>
            ))}
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
              <Button mt={4} type="submit" isLoading={submitting} loadingText="Submitting" onClick={() => submit(true)}>
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
