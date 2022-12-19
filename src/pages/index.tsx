import { Head } from 'components/layout/Head'
import { NetworkUtilization } from 'components/NetworkUtilization'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <NetworkUtilization />
      </main>
    </>
  )
}
