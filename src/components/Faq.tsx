import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { HeadingComponent } from './layout/HeadingComponent'

const Questions = [
  {
    question: 'What is a ZK certification?',
    answer: `A ZK certification is proof that you have completed a certain task. In this case, successfully completing a quiz that tested your knowledge. It is a digital credential that is stored on the Ethereum blockchain and can be verified by anyone without revealing any of the information with others. useWeb3 academy uses BlockQualified. You can find more information in their [documentation](https://deenz.gitbook.io/bq-core/).`,
  },
  {
    question: 'How do I gain a certification?',
    answer: `You can find an overview of all the available certifications here at the academy. Each certification contains an indicator for the recommended level of expertise.

- Beginner certifications are accessible for anyone learning about blockchains
- Intermediate certifications require some technical knowledge about the inner workings of blockchains
- Advanced certifications go into more depth and require hands-on experience working and building with blockchains

Successfully completing a quiz generates a ZK proof that is submitted on-chain. This prevents others from simply copying over answers from previous submissions and guarantees the validity of each transaction. The transaction results in a NFT that acts as your certification and can be used to show publicly.`,
  },
  {
    question: 'How do I check which certifications I have?',
    answer: `After successfully completing a quiz you are rewarded with a non-transferable NFT. This NFT is connected to your account and can be viewed in your favorite wallet or NFT platform.

More details will be added to the site here soon™️`,
  },
  {
    question: 'Can I create my own certification?',
    answer: `Yes, absolutely! useWeb3 Academy is completely open-source. If you have any questions or want to contribute, please reach out and connect on [Github](https://github.com/wslyvh/nexth/tree/academy/)

The proofs are verified using BlockQualified. You can find more information in their [documentation](https://deenz.gitbook.io/bq-core/).`,
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
            <HeadingComponent as="h2">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {i.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </HeadingComponent>
            <AccordionPanel pb={4}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{i.answer}</ReactMarkdown>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
