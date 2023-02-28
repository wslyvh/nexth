import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'

const Questions = [
  {
    question: 'What is a ZK certification?',
    answer:
      'A ZK certification is a proof that you have completed a task. It is a digital credential that is stored on the blockchain and can be verified by anyone.',
  },
  {
    question: 'How do I gain a credential?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'How do I check my credentials?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'How does it work?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'I want to create my own quiz. Can I do that?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]
interface Props {
  className?: string
}

export function Faq(props: Props) {
  const className = props.className ?? ''

  return (
    <Accordion className={className} defaultIndex={[0]} allowMultiple>
      {Questions.map((i) => {
        return (
          <AccordionItem key={i.question}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {i.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{i.answer}</AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
