import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { LinkComponent } from 'components/LinkComponent'
import { SITE_DESCRIPTION, SITE_NAME, SOCIAL_GITHUB, SOCIAL_TWITTER } from 'utils/config'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="footer" className={className} flexDirection="column" justifyContent="center" alignItems="center" mt={8}>
      <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
        <Text fontSize="xl">{SITE_NAME}</Text>
      </LinkComponent>

      <Text>{SITE_DESCRIPTION}</Text>

      <Flex fontSize="xs" color="gray.500" alignItems="center" gap={2}>
        <LinkComponent href={`https://twitter.com/${SOCIAL_TWITTER}`}>@wslyvh</LinkComponent>
      </Flex>
    </Flex>
  )
}
