import { useAccount } from 'wagmi'
import { Button, Text, Card, CardBody, SimpleGrid, Image } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { LinkComponent } from 'components/layout/LinkComponent'
import { usePassportScore } from 'hooks/passport/usePassportScore'
import { usePassportSubmit } from 'hooks/passport/usePassportSubmit'
import { usePassportStamps } from 'hooks/passport/usePassportStamps'
import { usePassportStampsIndex } from 'hooks/passport/usePassportStampsIndex'
import { HeadingComponent } from 'components/layout/HeadingComponent'

export default function PassportExample() {
  const { address, isConnected } = useAccount()
  const { loading, data: score, error } = usePassportScore()
  const { submit, submitting, error: submitError } = usePassportSubmit()
  const { loading: loadingStamps, data: stamps, error: stampsError } = usePassportStamps(true)
  const { data: availableStamps } = usePassportStampsIndex()

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
          <div style={{ marginTop: '30px' }}>
            <HeadingComponent as="h3">Your Passport Stamps</HeadingComponent>
            {stamps.map((stamp) => (
              <Card key={stamp.credential.proof.jws} maxW="sm">
                <CardBody>
                  <Image src={stamp.metadata?.platform.icon} boxSize="50px" />
                  <Text style={{ marginTop: '30px' }} fontSize="md">
                    {stamp.credential.credentialSubject.provider}
                  </Text>
                  <Text style={{ marginTop: '5px' }} fontSize="sm">
                    IssuanceDate: {new Date(stamp.credential.issuanceDate).toLocaleString()}
                  </Text>
                  <Text style={{ marginTop: '5px' }} fontSize="sm">
                    ExpirationDate: {new Date(stamp.credential.expirationDate).toLocaleString()}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {!!availableStamps && availableStamps.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <HeadingComponent as="h3">Available Passport Stamps</HeadingComponent>
            <SimpleGrid columns={3} spacing={5}>
              {availableStamps.map((stamp) => (
                <Card key={stamp.id} maxW="sm">
                  <CardBody>
                    <Image src={stamp.icon} boxSize="50px" />
                    <Text style={{ marginTop: '30px' }} fontSize="md">
                      {stamp.name}
                    </Text>
                    <Text style={{ marginTop: '10px' }} fontSize="sm">
                      {stamp.description}
                    </Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
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
