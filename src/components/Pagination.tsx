import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { THEME_COLOR_SCHEME } from 'utils/config'

type Props = {
  itemsPerPage: number
  totalItems: number
  selectedPage: number
  onSelectPage: (page: number) => void
  truncate?: boolean
  className?: string
}

export const Pagination = (props: Props) => {
  const className = props.className ?? ''
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage)

  function pagesToShow() {
    const offset = 1
    const left = props.selectedPage - offset
    const right = props.selectedPage + offset + 1
    const pages = []
    const truncatedPages = []

    if (!props.truncate) {
      return Array.from(Array(totalPages + 1).keys()).splice(1)
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        pages.push(i)
      }
    }

    let l
    for (let i of pages) {
      if (l) {
        if (i - l === 2) {
          truncatedPages.push(l + 1)
        } else if (i - l !== 1) {
          truncatedPages.push('...')
        }
      }

      truncatedPages.push(i)
      l = i
    }

    return truncatedPages
  }

  return (
    <Flex gap={2}>
      <Button colorScheme="gray" onClick={() => props.onSelectPage(props.selectedPage === 1 ? 1 : props.selectedPage - 1)}>
        &laquo;
      </Button>

      {pagesToShow().map((i, index) => {
        if (typeof i === 'string') return <Text>...</Text>

        return (
          <Button
            colorScheme={props.selectedPage === i ? THEME_COLOR_SCHEME : 'gray'}
            key={`pagination_${className}_${index}`}
            disabled={props.selectedPage === i}
            onClick={() => props.onSelectPage(i)}>
            {i}
          </Button>
        )
      })}

      <Button colorScheme="gray" onClick={() => props.onSelectPage(props.selectedPage === totalPages ? totalPages : props.selectedPage + 1)}>
        &raquo;
      </Button>
    </Flex>
  )
}
