import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Message', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMessageFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const Message = await ethers.getContractFactory('Message')
    const message = await Message.deploy()

    return { message, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should have correct default message', async function () {
      const defaultMesage = 'Quickly ship Web3 Apps'
      const { message } = await loadFixture(deployMessageFixture)

      expect(await message.message()).to.equal(defaultMesage)
    })
  })

  describe('Update', function () {
    it('Should be able to update message', async function () {
      const newMessage = 'Build unstoppable Apps'
      const { message } = await loadFixture(deployMessageFixture)

      expect(await message.setMessage(newMessage)).not.to.be.reverted
    })

    it('Should have correct message set', async function () {
      const newMessage = 'Build unstoppable Apps'
      const { message } = await loadFixture(deployMessageFixture)

      await message.setMessage(newMessage)

      expect(await message.message()).to.equal(newMessage)
    })

    describe('Events', function () {
      it('Should emit an event when message is set', async function () {
        const newMessage = 'Build unstoppable Apps'
        const { message, owner } = await loadFixture(deployMessageFixture)

        expect(await message.setMessage(newMessage))
          .to.emit(message, 'SetMessage')
          .withArgs(owner, message)
      })
    })
  })
})
