import React from 'react'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FaRobot } from 'react-icons/fa'
import { usePassportScore } from 'hooks/passport/usePassportScore'
import { LinkComponent } from './LinkComponent'

interface Props {
  className?: string
}

export function PassportScore(props: Props) {
  const className = props.className ?? ''
  const { data } = usePassportScore(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!data || data <= 0) return null

  return (
    <>
      <Box className={className} onClick={onOpen} _hover={{ cursor: 'pointer' }} display="flex" flexDirection="row" gap={2}>
        <FaRobot />
        <Text fontSize="xs">{data.toString()}</Text>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Passport Score {data.toString()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.
            By collecting “stamps” of validation for your identity your improving your reputation and score across the web3.
          </ModalBody>
          <ModalFooter>
            <LinkComponent href="https://passport.gitcoin.co/">
              <Button onClick={onClose}>More Details</Button>
            </LinkComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
