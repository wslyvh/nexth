import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'
import { THEME_COLOR_SCHEME } from 'utils/config'

interface Props {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
}

export function LinkComponent(props: Props) {
  const className = props.className ?? ''
  const isExternal = props.href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || props.isExternal

  if (isExternal) {
    return (
      <Link
        className={className}
        _hover={{ color: useColorModeValue(`${THEME_COLOR_SCHEME}.600`, `${THEME_COLOR_SCHEME}.400`) }}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer">
        {props.children}
      </Link>
    )
  }

  return (
    <Link
      as={NextLink}
      className={className}
      _hover={{ color: useColorModeValue(`${THEME_COLOR_SCHEME}.600`, `${THEME_COLOR_SCHEME}.400`) }}
      href={props.href}>
      {props.children}
    </Link>
  )
}
