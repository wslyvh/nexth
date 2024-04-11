import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('Message', function () {
  async function deployMessageFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients()

    const defaultMessage = 'Quickly ship Web3 Apps'
    const newMessage = 'Updated Message'
    const message = await hre.viem.deployContract('Message')

    const publicClient = await hre.viem.getPublicClient()

    return { message, defaultMessage, newMessage, owner, otherAccount, publicClient }
  }

  describe('Deployment', function () {
    it('Should have correct default message', async function () {
      const { message, defaultMessage } = await loadFixture(deployMessageFixture)

      expect(await message.read.message()).to.equal(defaultMessage)
    })
  })

  describe('Update', function () {
    it('Should have correct message set', async function () {
      const { message, defaultMessage } = await loadFixture(deployMessageFixture)

      expect(await message.read.message()).to.equal(defaultMessage)
    })

    it('Should be able to update message', async function () {
      const { message, defaultMessage, newMessage } = await loadFixture(deployMessageFixture)

      expect(await message.read.message()).to.equal(defaultMessage)

      await message.write.setMessage([newMessage])

      expect(await message.read.message()).to.equal(newMessage)
    })

    describe('Events', function () {
      it('Should emit an event when message is set', async function () {
        const { message, newMessage, publicClient } = await loadFixture(deployMessageFixture)

        const hash = await message.write.setMessage([newMessage])
        await publicClient.waitForTransactionReceipt({ hash })

        const messageEvents = await message.getEvents.SetMessage()
        expect(messageEvents).to.have.lengthOf(1)
      })
    })
  })
})
