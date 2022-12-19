import { Head } from 'components/layout/Head'
import { NetworkUtilization } from 'components/NetworkUtilization'

export default function Index() {
  return (
    <>
      <Head />

      <main>
        <NetworkUtilization />
      </main>
    </>
  )
}
