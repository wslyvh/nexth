import { Heading, Text } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { SITE_DESCRIPTION, SITE_NAME } from 'utils/config'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <Heading as="h2">{SITE_NAME}</Heading>
        <Text>{SITE_DESCRIPTION}</Text>
      </main>
    </>
  )
}
