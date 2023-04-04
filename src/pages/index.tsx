import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { Minter } from 'components/minter'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">Gitcoin Passport Score</HeadingComponent>

        <Minter />
      </main>
    </>
  )
}
