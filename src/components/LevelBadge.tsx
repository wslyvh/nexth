import React from 'react'
import { Badge } from '@chakra-ui/react'
import { THEME_COLOR_SCHEME } from 'utils/config'

interface Props {
  className?: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export function LevelBadge(props: Props) {
  const className = props.className ?? ''
  const level = props.level
  let color = THEME_COLOR_SCHEME
  if (level === 'Beginner') color = 'green'
  if (level === 'Intermediate') color = 'yellow'
  if (level === 'Advanced') color = 'red'

  return (
    <Badge className={className} variant="outline" colorScheme={color} pt={1} fontSize="x-small">
      {level}
    </Badge>
  )
}
