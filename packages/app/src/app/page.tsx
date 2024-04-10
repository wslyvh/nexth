import { CardList } from '@/components/CardList'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/site'
import { EXAMPLE_ITEMS } from './examples/examples'

export default function Home() {
  return (
    <>
      <h2 className='text-2xl mb-2'>{SITE_NAME}</h2>
      <p>{SITE_DESCRIPTION}</p>

      {/* Examples are only used for demo purposes. Feel free to delete this section */}
      <div className='mt-4'>
        <h3 className='text-lg mb-2'>Examples</h3>
        <p className='mb-4'>
          The following examples are used for demo purposes and help you bootstrap development. You can find the example
          the main repo at <code>src/app/examples</code>. Feel free to delete this section and the examples folder for
          your own App.
        </p>

        <CardList items={EXAMPLE_ITEMS} />
      </div>
    </>
  )
}
