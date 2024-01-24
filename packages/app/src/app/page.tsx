import { LinkComponent } from '@/components/LinkComponent'
import { SITE_DESCRIPTION } from '@/utils/site'

export default function Home() {
  return (
    <>
      <h2 className='text-lg'>Next.js + Ethereum starter kit</h2>
      <p>{SITE_DESCRIPTION}</p>

      <p className='mt-4'>
        <LinkComponent href='/examples'>View examples</LinkComponent> to bootstrap development.
      </p>
    </>
  )
}
