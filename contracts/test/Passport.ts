import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { assert, expect } from 'chai'
import { ethers } from 'hardhat'
import { CreateAndSignMessage } from '../utils/signature'

describe('Passport', function () {
  async function deployMessageFixture() {
    const [owner, minter] = await ethers.getSigners()

    const Passport = await ethers.getContractFactory('Passport')
    const nft = await Passport.deploy()
    const name = 'Gitcoin Passport Score'
    const symbol = 'GPS'

    return { nft, owner, minter, name, symbol }
  }

  describe('Deployment', function () {
    it('Should have correct default owner', async function () {
      const { nft, owner } = await loadFixture(deployMessageFixture)

      expect(await nft.owner()).to.equal(owner.address)
    })

    it('Should have correct name and symbol', async function () {
      const { nft, name, symbol } = await loadFixture(deployMessageFixture)

      expect(await nft.name()).to.equal(name)
      expect(await nft.symbol()).to.equal(symbol)
    })
  })

  describe('Mint', function () {
    it('Should allow to mint an NFT using owners signature', async function () {
      const { nft, owner, minter } = await loadFixture(deployMessageFixture)

      const signature = await CreateAndSignMessage(minter.address, 420, owner)
      assert.isNotNull(signature)

      // message signed by owner
      const tx = await nft.safeMint(minter.address, 420, signature)
      assert.isNotNull(tx.hash)

      await tx.wait()

      const balance = await nft.balanceOf(minter.address)
      expect(balance).equal(1)
    })

    it('Should reject if message is not signed by owner', async function () {
      const { nft, minter } = await loadFixture(deployMessageFixture)

      // message signed by minter
      const signature = await CreateAndSignMessage(minter.address, 420, minter)
      assert.isNotNull(signature)

      await expect(nft.safeMint(minter.address, 420, signature)).to.be.reverted

      const balance = await nft.balanceOf(minter.address)
      expect(balance).equal(0)
    })
  })
})
