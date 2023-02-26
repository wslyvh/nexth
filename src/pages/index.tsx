import { Text } from '@chakra-ui/react'
import { CardList } from 'components/layout/CardList'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { SITE_NAME, SITE_DESCRIPTION } from 'utils/config'
import { GetStaticProps } from 'next'
import { GetCertifications } from 'utils/certifications'
import { Certification } from 'types/certifications'

interface Props {
  items: Certification[]
}

export default function Home(props: Props) {
  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">{SITE_NAME}</HeadingComponent>
        <Text>{SITE_DESCRIPTION}</Text>

        <CardList title="Certifications" items={props.items} />
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
