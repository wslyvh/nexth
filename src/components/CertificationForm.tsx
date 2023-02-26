import { Button, Flex, FormControl, FormLabel, Radio, RadioGroup } from '@chakra-ui/react'
import { FormEvent } from 'react'
import { Certification } from 'types/certifications'

interface Props {
  className?: string
  item: Certification
}

export function CertificationForm(props: Props) {
  const className = props.className ?? ''

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values = props.item.questions.map((i) => {
      const elements = event.currentTarget.elements
      const element = elements.namedItem(i.title) as HTMLInputElement
      return element.value
    })

    console.log('VALUES', values)
  }

  return (
    <form className={className} onSubmit={handleSubmit} role="form">
      <section>
        {props.item.questions.map((i) => {
          return (
            <FormControl as="fieldset" key={i.title} isRequired>
              <FormLabel as="legend">{i.title}</FormLabel>
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
