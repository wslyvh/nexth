import { Button, Flex, FormControl, FormLabel, Radio, RadioGroup, useToast } from '@chakra-ui/react'
import { FormEvent } from 'react'
import { Certification } from 'types/certifications'

interface Props {
  className?: string
  item: Certification
}

export function CertificationForm(props: Props) {
  const toast = useToast()
  const className = props.className ?? ''

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const data = new FormData(event.currentTarget)

    const values = props.item.questions.map((i) => {
      const elements = event.currentTarget.elements
      const element = elements.namedItem(i.title) as HTMLInputElement
      return element.value
    })

    toast({
      title: `Generating proof...`,
      status: 'info',
      variant: 'solid',
      position: 'bottom',
      isClosable: true,
    })

    toast({
      title: `Invalid solution. Please try again.`,
      status: 'error',
      variant: 'solid',
      position: 'bottom',
      isClosable: true,
    })

    toast({
      title: `Completed. Congratulations!`,
      status: 'success',
      variant: 'solid',
      position: 'bottom',
      isClosable: true,
    })
  }

  return (
    <form className={className} onSubmit={handleSubmit} role="form">
      <section>
        {props.item.questions.map((i) => {
          return (
            <FormControl as="fieldset" key={i.title} isRequired my={4}>
              <FormLabel as="legend" fontSize="lg" fontWeight="semibold">
                {i.title}
              </FormLabel>
              <RadioGroup name={i.title}>
                <Flex direction="column">
                  {i.answers.map((a) => {
                    return (
                      <Radio key={a} value={a}>
                        {a}
                      </Radio>
                    )
                  })}
                </Flex>
              </RadioGroup>
            </FormControl>
          )
        })}

        <Button type="submit">Submit</Button>
      </section>
    </form>
  )
}
