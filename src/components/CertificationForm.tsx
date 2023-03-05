import { Stack, Button, Flex, FormControl, FormLabel, Radio, RadioGroup, useToast } from '@chakra-ui/react'
import { bqTest } from "bq-core"
import { useEffect, FormEvent, useState, Dispatch } from 'react'
import { useAccount } from "wagmi";
import { fetchSigner } from '@wagmi/core'
import { Certification } from 'types/certifications'
import { DEPLOYED_CONTRACTS, ETHERS_PROVIDER } from 'utils/config';

interface Props {
  className?: string
  item: Certification
}

export function CertificationForm(props: Props) {
  const [test, setTest] = useState<any>();
  const [testProof, setTestProof] = useState<any>();
  const [buttonStates, setButtonStates] = useState({"prove": false, "submit": false});
  const [clickedButton, setClickedButton] = useState<"grade" | "prove" | "submit" | "">("");

  const { address } = useAccount()

  const toast = useToast()
  const className = props.className ?? ''

  useEffect(() =>  {
    const loadTest = async() => {
      const solveModeTest = await bqTest.solveMode(
        props.item.testId,
        ETHERS_PROVIDER,
        DEPLOYED_CONTRACTS.TesterCreator
      )
      setTest(solveModeTest)
    }
    loadTest()
  }, [])

  function setToast(title: string, description: string, status: "success" | "error" | "info") {
    toast({
      title,
      description,
      status,
      variant: 'solid',
      position: 'bottom',
      isClosable: true,
    })
  }

  function handleGrade(multipleChoiceAnswers: number[]) {
    const grade = test.gradeSolution({
      multipleChoiceAnswers
    })

    if (grade.pass) {
      setToast(
        `You passed this test`, 
        `You obtained ${grade.grade}/100 and can obtain this credential.`, 
        'success'
      )
    } else {
      setToast(
        `You did not pass this test`, 
        `You obtained ${grade.grade}/100 which is below the minimum grade of ${grade.minimumGrade}. You cannot obtain this credential.`, 
        'error'
      )
    }
  }

  async function handleProve(multipleChoiceAnswers: number[]) {
    if (!address) {
      setToast(
        'You need to connect your wallet first',
        '',
        'error'
      )
      return
    }

    const grade = test.gradeSolution({
      multipleChoiceAnswers
    })
    if (!grade.pass) {
      setToast(
        `Your solution does not pass this test`, 
        `You obtained ${grade.grade}/100 which is below the minimum grade of ${grade.minimumGrade}. You cannot obtain this credential.`, 
        'error'
      )
      return
    }

    const isHolder = await test.holdsCredential(address)
    if (isHolder) {
      setToast(
        'You already own this credential',
        '',
        'error'
      )
      return
    }

    setButtonStates(prevState => ({...prevState, prove: true}))
    setToast(
      'Generating proof',
      'Hang tight, this might take a while',
      'info'
    )

    const proof = await test.generateSolutionProof({
      recipient: address,
      multipleChoiceAnswers
    })
    setTestProof(proof)

    setButtonStates(prevState => ({...prevState, prove: false}))
    setToast(
      'Proof generated!',
      `Click on 'Submit' to send your transaction and get your credential`,
      'success'
    )
  }

  async function handleSubmit() {
    if (!testProof) {
      setToast(
        'You need to generate a proof first',
        `To generate a proof, click on the 'Prove' button`,
        'error'
      )
      return
    }

    if (!address) {
      setToast(
        'You need to connect your wallet first',
        '',
        'error'
      )
      return
    }

    const isHolder = await test.holdsCredential(address)
    if (isHolder) {
      setToast(
        'You already own this credential',
        '',
        'error'
      )
      return
    }

    setButtonStates(prevState => ({...prevState, submit: true}))

    const signer = await fetchSigner()
    try {  
      const tx = await test.sendSolutionTransaction( 
        signer,
        testProof
      )
      await tx.wait()
    } catch(err) {
      return
    }

    setToast(
      'Congratulations! You obtained this credential',
      '',
      'success'
    )

    setButtonStates(prevState => ({...prevState, submit: false}))
  }

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const multipleChoiceAnswers = props.item.questions.map((i) => {
      const elements = event.currentTarget.elements
      const element = elements.namedItem(i.title) as HTMLInputElement
      return i.answers.indexOf(element.value) + 1
    })

    if (clickedButton === "grade") {
      handleGrade(multipleChoiceAnswers)
    } else if (clickedButton === "prove") {
      handleProve(multipleChoiceAnswers)
    } else if (clickedButton === "submit") {
      handleSubmit()
    }
  }

  return (
    <form className={className} onSubmit={handleForm} role="form">
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

        <Stack spacing={4} direction='row' align='center'> 
          <Button type="submit" onClick={()=>{setClickedButton("grade")}}>Grade</Button>
          <Button type="submit" isLoading={buttonStates.prove} onClick={()=>{setClickedButton("prove")}}>Prove</Button>
          <Button type="submit" isLoading={buttonStates.submit} onClick={()=>{setClickedButton("submit")}}>Submit</Button>
        </Stack>
      </section>
    </form>
  )
}
