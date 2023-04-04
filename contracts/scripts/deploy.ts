import { ethers, network, run } from 'hardhat'

async function main() {
  console.log('Deploy Gitcoin Passport Score NFT...')
  const [deployer, recipient] = await ethers.getSigners()

  const args: any[] = []
  const Passport = await ethers.getContractFactory('Passport')
  const nft = await Passport.deploy(...args)

  await nft.deployed()

  console.log(`NFT deployed to ${nft.address}`)

  // no need to verify on localhost or hardhat
  if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log(`Waiting for block confirmation...`)
    await nft.deployTransaction.wait(10)

    console.log('Verifying contract...')
    try {
      run('verify:verify', {
        address: nft.address,
        constructorArguments: args,
        contract: 'contracts/Passport.sol:Passport',
      })
    } catch (e) {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
