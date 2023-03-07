import { HardhatUserConfig } from 'hardhat/config'
import { join } from 'path'
import dotenv from 'dotenv'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config({ path: join(process.cwd(), '../.env') })

const deployerKey = process.env.DEPLOYER_KEY
if (!deployerKey) {
  console.warn('DEPLOYER_KEY not found in .env file. Running with default config')
}

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      url: 'https://rpc.sepolia.org/',
      accounts: [process.env.DEPLOYER_KEY as string],
    },
  },
}

export default config
