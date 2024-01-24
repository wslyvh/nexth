import { CardList } from '@/components/CardList'

import EtherIcon from '@/assets/icons/ethereum.png'
import TokenIcon from '@/assets/icons/token.png'

const ExampleItems = [
  {
    title: 'Send Ether',
    description: 'Sending Ether to another address is the most basic, common transaction that you can do.',
    image: EtherIcon.src,
    url: '/examples/send-ether',
  },
  {
    title: 'Send ERC20 Token',
    description:
      'ERC20 introduces a standard interface for fungible tokens. Use this example to send any ERC20 to another address.',
    image: TokenIcon.src,
    url: '/examples/send-token',
  },
]

export default function Home() {
  return (
    <>
      <h2 className='text-xl'>Nexth Examples</h2>

      <p className='mb-4'>
        All these examples can be found in the main repo at <code>src/app/examples</code> to help you bootstrap
        development. You can delete the entire folder before deploying your own App.
      </p>

      <CardList title='Examples' items={ExampleItems} />
    </>
  )
}
