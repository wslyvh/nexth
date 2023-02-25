import { Text } from '@chakra-ui/react'
import { CardList } from 'components/layout/CardList'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { SITE_NAME, SITE_DESCRIPTION } from 'utils/config'

import FundamentalsIcon from 'assets/icons/blockchain.png'
import WalletIcon from 'assets/icons/wallet.png'
import EthereumIcon from 'assets/icons/ether.png'
import ContractsIcon from 'assets/icons/smart-contracts.png'
import SolidityIcon from 'assets/icons/code.png'

export const CertificationItems = [
  {
    title: 'Blockchain Fundamentals',
    description: 'Learn about the fundamentals of blockchain, how it works and why it matters.',
    image: FundamentalsIcon.src,
    url: '/',
  },
  {
    title: 'Wallets',
    description: 'Learn about wallets, publick-key cryptography, and how to use them to interact with the blockchain.',
    image: WalletIcon.src,
    url: '/',
  },
  {
    title: 'Ethereum 101',
    description: 'Learn about the Ethereum blockchain protocol, how it works and how to build on it.',
    image: EthereumIcon.src,
    url: '/',
  },
  {
    title: 'Smart Contracts',
    description: 'Smart contracts are a fundamental part of the Ethereum ecosystem. Learn more about them here.',
    image: ContractsIcon.src,
    url: '/',
  },
  {
    title: 'Solidity',
    description: 'Learn about the Solidity programming language, how to write smart contracts, and how to deploy them.',
    image: SolidityIcon.src,
    url: '/',
  },
]

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">{SITE_NAME}</HeadingComponent>
        <Text>{SITE_DESCRIPTION}</Text>

        <CardList title="Certifications" items={CertificationItems} />
      </main>
    </>
  )
}
