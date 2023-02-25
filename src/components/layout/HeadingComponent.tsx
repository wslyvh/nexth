import { ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

interface Props {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  children: ReactNode
  className?: string
}

export function HeadingComponent(props: Props) {
  const className = props.className ?? ''
  let size
  switch (props.as) {
    case 'h1':
      size = props.size ?? '2xl'
      break
    case 'h2':
      size = props.size ?? 'xl'
      break
    case 'h3':
      size = props.size ?? 'lg'
      break
    case 'h4':
      size = props.size ?? 'md'
      break
    case 'h5':
      size = props.size ?? 'sm'
      break
    case 'h6':
      size = props.size ?? 'xs'
      break
  }

  return (
    <Heading as={props.as} size={size} className={className} mb={2}>
      {props.children}
    </Heading>
  )
}
