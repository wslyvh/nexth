import { Card, CardHeader, Heading, CardBody, Text, Stack, StackDivider, Flex, Spacer } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  title: ReactNode
  items: any[]
}

export function StatsCard(props: Props) {
  return (
    <Card width="100%">
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {props.items.map((i) => {
            return (
              <Flex alignItems="center">
                <Heading size="sm" textTransform="uppercase">
                  {i.title}
                </Heading>
                <Spacer />
                <Text fontSize="sm">{i.value}</Text>
              </Flex>
            )
          })}
        </Stack>
      </CardBody>
    </Card>
  )
}
