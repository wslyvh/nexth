import { useAccount, useBalance, useSendTransaction, useWaitForTransaction, useNetwork } from 'wagmi'
import { Button, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { parseEther } from 'viem'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useDebounce } from 'usehooks-ts'

function SendEther() {
  const [to, setTo] = useState('')
  const debouncedTo = useDebounce(to, 500)

  const [amount, setAmount] = useState('')
  const debouncedAmount = useDebounce(amount, 500)

  const { chain } = useNetwork()
  const { address } = useAccount()
  const balance = useBalance({
    address,
  })

  const sendTransaction = useSendTransaction({
    account: address,
    to: debouncedTo,
    value: debouncedAmount ? parseEther(debouncedAmount as `${number}`) : undefined,
  })
  const waitForTransaction = useWaitForTransaction({ hash: sendTransaction.data?.hash, onSettled: () => balance.refetch() })

  const handleSendTransation = () => {
    sendTransaction.sendTransaction?.()
  }

  return (
    <div>
      <Heading as="h3" fontSize="xl" my={4}>
        Send Ether
      </Heading>

      <FormControl>
        <FormLabel>Recipient</FormLabel>
        <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="0xA0Cf…251e" />

        <FormLabel mt={2}>Amount</FormLabel>
        <NumberInput mb={2} value={amount} onChange={(value) => setAmount(value)}>
          <NumberInputField placeholder="0.05" />
        </NumberInput>
        <Text>
          Your balance: {balance.data?.formatted} {balance.data?.symbol}
        </Text>

        <Button
          disabled={waitForTransaction.isLoading || sendTransaction.isLoading || !sendTransaction.sendTransaction || !to || !amount}
          mt={4}
          onClick={handleSendTransation}>
          {waitForTransaction.isLoading ? 'Sending...' : sendTransaction.isLoading ? 'Check your wallet' : 'Send'}
        </Button>
        {waitForTransaction.isSuccess && (
          <div>
            <Text mt={2} fontSize="lg">
              Successfully sent {amount} ether to {to}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              <LinkComponent href={`${chain?.blockExplorers?.default.url}/tx/${sendTransaction.data?.hash}`}>Check on block explorer</LinkComponent>
            </Text>
          </div>
        )}
        {waitForTransaction.isError && (
          <div>
            <Text mt={2} color="red" fontSize="lg">
              Error sending {amount} ether to {to}
            </Text>
            <Text color="red" fontSize="lg" fontWeight="bold">
              {waitForTransaction.error?.message}
            </Text>
          </div>
        )}
      </FormControl>
    </div>
  )
}

export default function SendEtherExample() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return (
      <div>
        <NextSeo title="Send Ether transaction" />
        <Heading as="h2" fontSize="2xl" my={4}>
          Send Ether transaction
        </Heading>
        <p>
          This example shows how to send an Ether transaction. You can use this to send Ether to another address, or to interact with a smart
          contract.
        </p>

        <SendEther />
      </div>
    )
  }

  return <div>Connect your wallet first to sign a message.</div>
}
