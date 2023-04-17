import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Image, Text, useToast } from '@chakra-ui/react'
import { LinkComponent } from './layout/LinkComponent'
import { usePassportScore } from 'hooks/usePassportScore'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { GetNonce, SubmitPassport } from 'clients/passport'
import { prepareWritePassport, readPassport, writePassport } from 'abis'
import { waitForTransaction } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { passportAddress } from 'abis'

interface Props {
  className?: string
}

export function Minter(props: Props) {
  const className = props.className ?? ''
  const chainId = 10

  const toast = useToast()
  const [token, setToken] = useState<BigNumber | undefined>()
  const [image, setImage] = useState('')
  const [refresh, reloadData] = useState(0)
  const { address, isConnected } = useAccount()
  const { loading, data: score } = usePassportScore(true, refresh)
  const { data: signer } = useSigner()

  useEffect(() => {
    async function fetchToken() {
      if (!isConnected || !address) return

      try {
        const read = await readPassport({
          functionName: 'tokenOfOwnerByIndex',
          args: [address, BigNumber.from(0)],
        })
        const image = await readPassport({
          functionName: 'generateSvg',
          args: [read],
        })

        setToken(read)
        setImage(image)
      } catch (ex) {
        // Token does not exist
        setToken(undefined)
        setImage('')
      }
    }

    fetchToken()
  }, [address, isConnected, refresh])

  async function register() {
    if (!isConnected || !address || !signer) return

    const { message, nonce } = await GetNonce()
    const signature = await signer.signMessage(message)
    await SubmitPassport(address, signature, nonce)

    // short timeout to allow for Gitcoin to process the score
    await new Promise((r) => setTimeout(r, 500))
    reloadData(refresh + 1)
  }

  async function mint() {
    writeContract('safeMint')
  }

  async function update() {
    writeContract('update')
  }

  async function writeContract(method: 'safeMint' | 'update') {
    if (!isConnected || !address || !signer || !score) return

    try {
      const response = await fetch(`/api/verifier/sign?address=${address}&score=${score}`)
      const data = await response.json()

      let request
      if (method === 'safeMint') {
        request = await prepareWritePassport({
          functionName: 'safeMint',
          chainId: 10,
          args: [address, score, data.signature],
        })
      }
      if (method === 'update' && token) {
        request = await prepareWritePassport({
          functionName: 'update',
          chainId: 10,
          args: [token, address, score, data.signature],
        })
      }

      toast({
        title: 'Confirm transaction',
        description: 'Please confirm the the transaction in your wallet.',
        status: 'info',
        variant: 'solid',
        position: 'bottom',
        isClosable: true,
      })
      const tx = await writePassport(request as any)

      toast({
        title: 'Please wait',
        description: 'Please wait while your transaction is getting processed..',
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

        reloadData(refresh + 1)
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    <>
      <Box as="section" className={className} my={4}>
        <Text>
          Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information. By
          collecting “stamps” of validation for your identity your improving your reputation and score across the web3.
        </Text>
        <Flex my={4} gap={4}>
          <LinkComponent href="https://passport.gitcoin.co/">
            <Button>More Details</Button>
          </LinkComponent>
        </Flex>

        <Heading as="h3" fontSize="xl" my={4}>
          Mint
        </Heading>
        <Text>
          Mint your Sybil resistance score as NFT. Make sure you have valid stamps on your{' '}
          <LinkComponent href="https://passport.gitcoin.co/">passport</LinkComponent>. If you recently added stamps, make sure to refresh your score.
        </Text>

        {!isConnected && <Text as="i">Connect your account first..</Text>}

        <Box my={4}>
          {!loading && address && score === undefined && <Button onClick={register}>Register</Button>}

          {!loading && address && score !== undefined && (
            <Box>
              <Text>
                Your passport score is <b>{score.toString()}</b>
              </Text>
              <Flex gap={2}>
                <Button onClick={mint} disabled={!!image}>
                  Mint
                </Button>
                <Button onClick={register}>Refresh</Button>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>

      <Box as="section" my={4}>
        {image && (
          <>
            <Flex w="100%" justifyContent="center">
              <Flex flexDirection="column" gap={2}>
                <Image src={image} width="512px" alt="Passport NFT" />
                <Button onClick={update}>Update Score</Button>
                <LinkComponent href={`${chain?.blockExplorers?.default.url}/nft/${passportAddress[chainId]}/${token}`} removeUnderline>
                  <Button width="100%">More Details</Button>
                </LinkComponent>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </>
  )
}
