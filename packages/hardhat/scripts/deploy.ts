import { ethers, network, run } from 'hardhat'

async function main() {
  console.log('Deploying Message...')

  const args: any[] = []
  const Message = await ethers.getContractFactory('Message')
  const message = await Message.deploy(...args)

  await message.deployed()

  console.log(`Message deployed to ${message.address}`)

  // no need to verify on localhost or hardhat
  if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log(`Waiting for block confirmation...`)
    await message.deployTransaction.wait(5)

    console.log('Verifying contract...')
    try {
      run('verify:verify', {
        address: message.address,
        constructorArguments: args,
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
