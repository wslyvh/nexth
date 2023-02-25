import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { CardList } from 'components/layout/CardList'
import { Code, Text } from '@chakra-ui/react'

import SignIcon from '../../assets/icons/fingerprint.png'
import AuthIcon from '../../assets/icons/auth.png'
import PassportIcon from '../../assets/icons/passport.png'

export const ExampleItems = [
  {
    title: 'Sign & verify messages',
    description: 'Keys can be used to sign any kind of messages. This is useful to verify a message was sent by a specific account.',
    image: SignIcon.src,
    url: '/examples/sign',
  },
  {
    title: 'Sign-in with Ethereum',
    description: 'Sign-in with Ethereum is a new form of authentication that enables users to control their identity with their Ethereum account.',
    image: AuthIcon.src,
    url: '/examples/siwe',
  },
  {
    title: 'Gitcoin Passport',
    description:
      'Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.',
    image: PassportIcon.src,
    url: '/examples/passport',
  },
]

export default function Examples() {
  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">Nexth Examples</HeadingComponent>
        <Text pb={4}>
          All these examples can be found in the main repo at <Code>src/pages/examples</Code> to help you bootstrap development. You can delete the
          entire folder before deploying your own App.{' '}
        </Text>

        <CardList title="Examples" items={ExampleItems} />
      </main>
    </>
  )
}
