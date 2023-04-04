import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { assert, expect } from 'chai'
import { ethers } from 'hardhat'
import { CreateAndSignMessage, CreateMessage } from '../utils/signature'

describe('Passport', function () {
  async function deployMessageFixture() {
    const [owner, minter] = await ethers.getSigners()

    const Verifier = await ethers.getContractFactory('Verifier')
    const verifier = await Verifier.deploy()

    return { verifier, owner, minter }
  }

  describe('Deployment', function () {
    it('Should have correct default owner', async function () {
      const { verifier, owner } = await loadFixture(deployMessageFixture)

      expect(await verifier.owner()).to.equal(owner.address)
    })
  })

  describe('Verifier', function () {
    it('Should create the same local and on-chain messages', async function () {
      const { verifier, owner, minter } = await loadFixture(deployMessageFixture)

      const ethersMessage = CreateMessage(minter.address, 420, owner.address)
      assert.isNotNull(ethersMessage)

      const solidityMessage = await verifier.createMessage(minter.address, 420)
      assert.isNotNull(solidityMessage)

      expect(ethersMessage).to.equal(solidityMessage)
    })

    it('Should verify the signature on-chain', async function () {
      const { verifier, owner, minter } = await loadFixture(deployMessageFixture)

      const signature = await CreateAndSignMessage(minter.address, 420, owner)
      assert.isNotNull(signature)

      const valid = await verifier.verifySignature(minter.address, 420, signature)
      expect(valid).not.to.be.reverted
      assert.isTrue(valid)
    })
  })
})
