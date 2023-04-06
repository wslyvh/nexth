import React from 'react'
import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react'
import { LinkComponent } from './layout/LinkComponent'
import { usePassportScore } from 'hooks/usePassportScore'
import { useAccount, useSigner } from 'wagmi'
import { GetNonce, SubmitPassport } from 'clients/passport'
import { prepareWritePassport, writePassport } from 'abis'
import { waitForTransaction } from '@wagmi/core'

interface Props {
  className?: string
}

export function Minter(props: Props) {
  const className = props.className ?? ''
  const toast = useToast()
  const { address, isConnected } = useAccount()
  const { loading, data: score } = usePassportScore(true)
  const { data: signer } = useSigner()

  async function register() {
    if (!isConnected || !address || !signer) return

    const { message, nonce } = await GetNonce()
    const signature = await signer.signMessage(message)
    await SubmitPassport(address, signature, nonce)
  }

  async function mint() {
    if (!isConnected || !address || !signer || !score) return

    try {
      const response = await fetch(`/api/verifier/sign?address=${address}&score=${score}`)
      const data = await response.json()

      const prepareWrite = await prepareWritePassport({
        functionName: 'safeMint',
        args: [address, score, data.signature],
      })

      toast({
        title: 'Confirm transaction',
        description: 'Please confirm the the transaction in your wallet.',
        status: 'info',
        variant: 'solid',
        position: 'bottom',
        isClosable: true,
      })
      const tx = await writePassport(prepareWrite)

      toast({
        title: 'Please wait',
        description: 'Please wait while your transaction is getting mined..',
        status: 'info',
        variant: 'solid',
        position: 'bottom',
        isClosable: true,
      })
      const result = await waitForTransaction({ hash: tx.hash })

      if (result?.transactionHash) {
        toast({
          title: 'Completed',
          description: 'Succesfully minted your Passport Score.',
          status: 'success',
          variant: 'solid',
          position: 'bottom',
          isClosable: true,
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    <>
      <Info />

      <Box as="section" className={className} my={4}>
        {!isConnected && <Text as="i">Connect your account first..</Text>}

        {!loading && score === undefined && (
          <Box my={4}>
            <Text>Register your account first..</Text>
            <Button onClick={register}>Register</Button>
          </Box>
        )}

        {!loading && score === 0 && (
          <Text>
            Make sure you have added stamps on <LinkComponent href="https://passport.gitcoin.co/">your passport</LinkComponent>.
          </Text>
        )}

        {!loading && !!score && score > 0 && (
          <Text>
            <p>Your passport score is {score.toString()}</p>
          </Text>
        )}

        {!loading && !!score && score > 0 && (
          <Box my={4}>
            <Button onClick={mint}>Mint</Button>
          </Box>
        )}
      </Box>
    </>
  )
}

export function Info() {
  return (
    <Box as="section" my={4}>
      <Text>
        Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information. By
        collecting “stamps” of validation for your identity your improving your reputation and score across the web3.
      </Text>
      <Box my={4}>
        <LinkComponent href="https://passport.gitcoin.co/">
          <Button>More Details</Button>
        </LinkComponent>
      </Box>

      <Heading as="h3" fontSize="xl" my={4}>
        Mint NFT
      </Heading>
      <Text>Mint your Sybil resistance score as NFT</Text>
    </Box>
  )
}
