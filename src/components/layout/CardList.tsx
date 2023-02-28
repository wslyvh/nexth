import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue, Badge, Stack } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
import { THEME_COLOR_SCHEME } from 'utils/config'
import { Certification } from 'types/certifications'

interface Props {
  className?: string
  title?: string
  items: Certification[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const invert = useColorModeValue('20%', '80%')

  return (
    <Box as="section" className={className}>
      {props.title && <HeadingComponent as="h3">{props.title}</HeadingComponent>}

      <Flex direction="column" gap={4}>
        {props.items.map((i, index) => {
          const url = `/certifications/${i.id}`
          let color = THEME_COLOR_SCHEME
          if (i.level === 'Beginner') color = 'green'
          if (i.level === 'Intermediate') color = 'yellow'
          if (i.level === 'Advanced') color = 'red'

          return (
            <Card key={`${index}_${i.title}`} variant="outline" size="sm">
              <CardBody>
                <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                  <Flex px={{ base: 0, sm: 4 }}>
                    <Image objectFit="contain" maxW="60px" src={i.image} alt={i.title} filter={`invert(${invert})`} />
                  </Flex>

                  <Flex direction="column">
                    <LinkComponent href={url}>
                      <HeadingComponent as="h4">{i.title}</HeadingComponent>
                    </LinkComponent>

                    <Text mt={2}>{i.description}</Text>

                    <Stack direction="row" mt={2} alignItems="center">
                      <Badge variant="outline" colorScheme={color} pt={1} fontSize="x-small">
                        {i.level}
                      </Badge>
                      <Text fontSize="sm">{i.questions.length} questions</Text>
                    </Stack>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
      </Flex>
    </Box>
  )
}
