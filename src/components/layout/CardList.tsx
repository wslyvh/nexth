import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue, Stack } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
import { Certification } from 'types/certifications'
import { LevelBadge } from 'components/LevelBadge'

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

          return (
            <Card key={`${index}_${i.name}`} variant="outline" size="sm">
              <CardBody>
                <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                  <Flex px={{ base: 0, sm: 4 }}>
                    <Image objectFit="contain" maxW="60px" src={i.icon} alt={i.name} filter={`invert(${invert})`} />
                  </Flex>

                  <Flex direction="column">
                    <LinkComponent href={url}>
                      <HeadingComponent as="h4">{i.name}</HeadingComponent>
                    </LinkComponent>

                    <Text mt={2}>{i.description}</Text>

                    <Stack direction="row" mt={2} alignItems="center">
                      <LevelBadge level={i.level} />
                      {i.questions.length === 0 && (
                        <Text fontSize="sm" fontStyle="italic">
                          coming soon
                        </Text>
                      )}
                      {i.questions.length > 0 && <Text fontSize="sm">{i.questions.length} questions</Text>}
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
