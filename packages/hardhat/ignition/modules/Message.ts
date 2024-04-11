import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const MessageModule = buildModule('MessageModule', (m) => {
  const message = m.contract('Message')

  return { message }
})

export default MessageModule
