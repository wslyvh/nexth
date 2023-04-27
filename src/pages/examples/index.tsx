import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { CardList } from 'components/layout/CardList'
import { Code, Text } from '@chakra-ui/react'

import SignIcon from 'assets/icons/fingerprint.png'
import AuthIcon from 'assets/icons/auth.png'
import PassportIcon from 'assets/icons/passport.png'
import CustomIcon from 'assets/icons/custom.png'
import EtherIcon from 'assets/icons/ethereum.png'
import TokenIcon from 'assets/icons/token.png'
import NFTIcon from 'assets/icons/nft.png'
import ENSIcon from 'assets/icons/ens.png'

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
  {
    title: 'Custom Contract',
    description: 'This example shows a custom Solidity smart contract deployed using Hardhat. You can find sample contract under /contracts.',
    image: CustomIcon.src,
    url: '/examples/custom-message',
  },
  {
    title: 'Send Ether',
    description: 'Sending Ether to another address is the most basic, common transaction that you can do.',
    image: EtherIcon.src,
    url: '/examples/send-ether',
  },
  {
    title: 'Send ERC20 Token',
    description: 'ERC20 introduces a standard interface for fungible tokens. Use this example to send any ERC20 to another address.',
    image: TokenIcon.src,
    url: '/examples/send-erc20',
  },
  {
    title: 'Mint NFT',
    description: 'A Non-Fungible Token (NFT) is used to identify something or someone in a unique way. Use this ERC721 example to mint your own NFT.',
    image: NFTIcon.src,
    url: '/examples/mint-nft',
  },
  {
    title: 'Fetch ENS',
    description:
      'Fetch Ethereum Name Service names to Ethereum addresses using a decentralized domain name system that maps human-readable names to addresses.',
    image: ENSIcon.src,
    url: '/examples/fetch-ens',
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
