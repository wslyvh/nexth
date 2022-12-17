import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { SITE_NAME, SOCIAL_GITHUB } from 'utils/config'
import { LinkComponent } from 'components/LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2} mb={8} alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="md">
          {SITE_NAME}
        </Heading>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
          <FaGithub />
        </LinkComponent>
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
