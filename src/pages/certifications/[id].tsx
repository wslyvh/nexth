import { Stack, Text } from '@chakra-ui/react'
import { CertificationForm } from 'components/CertificationForm'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LevelBadge } from 'components/LevelBadge'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Certification } from 'types/certifications'
import { GetCertifications } from 'utils/certifications'

interface Props {
  item: Certification
}

export default function Home(props: Props) {
  const { item } = props
  if (!item) return null

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">
          {item.name} <LevelBadge level={item.level} />
        </HeadingComponent>
        <Text>{item.description}</Text>
      </main>

      {item.questions.length === 0 && (
        <Text fontSize="sm" fontStyle="italic" my={4}>
          coming soon
        </Text>
      )}
      {item.questions.length > 0 && <CertificationForm item={item} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = GetCertifications()

  return {
    paths: items.map((i) => ({ params: { id: i.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id
  const items = GetCertifications()
  const item = items.find((i) => i.id === id)
  if (!id || !item) return { props: null, notFound: true }

  return {
    props: {
      item,
    },
  }
}
