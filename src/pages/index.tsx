import { Badge, Box, Text } from '@chakra-ui/react'
import { CardList } from 'components/layout/CardList'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { SITE_NAME, SITE_DESCRIPTION } from 'utils/config'
import { GetStaticProps } from 'next'
import { GetCertifications } from 'utils/certifications'
import { Certification } from 'types/certifications'
import { Faq } from 'components/Faq'

interface Props {
  items: Certification[]
}

export default function Home(props: Props) {
  return (
    <>
      <Head />

      <main>
        <Text my={4}>{SITE_DESCRIPTION}</Text>

        <CardList title="Certifications" items={props.items} />

        <Box as="section" my={8}>
          <HeadingComponent as="h3">FAQ</HeadingComponent>
          <Faq />
        </Box>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const items = GetCertifications()

  return {
    props: {
      items,
    },
  }
}
