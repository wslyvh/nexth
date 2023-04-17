import { HardhatUserConfig } from 'hardhat/config'
import { join } from 'path'
import dotenv from 'dotenv'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config({ path: join(process.cwd(), '../.env') })

const deployerKey = process.env.DEPLOYER_KEY
if (!deployerKey) {
  console.warn('DEPLOYER_KEY not found in .env file. Running with default config')
}
const etherscanApiKey = process.env.ETHERSCAN_API_KEY ?? ''
if (!etherscanApiKey) {
  console.warn('ETHERSCAN_API_KEY not found in .env file. Will skip Etherscan verification')
}
const polygonApiKey = process.env.POLYSCAN_API_KEY ?? etherscanApiKey ?? ''
if (!polygonApiKey) {
  console.warn('POLYSCAN_API_KEY not found in .env file. Will skip Etherscan verification')
}
const optimisticApiKey = process.env.OPTIMISTIC_API_KEY ?? etherscanApiKey ?? ''
if (!optimisticApiKey) {
  console.warn('OPTIMISTIC_API_KEY not found in .env file. Will skip Etherscan verification')
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      mainnet: etherscanApiKey,
      sepolia: etherscanApiKey,
      optimisticEthereum: optimisticApiKey,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      chainId: 11155111,
      url: 'https://rpc.sepolia.org/',
      accounts: [deployerKey as string],
    },
    optimism: {
      chainId: 10,
      url: 'https://mainnet.optimism.io/',
      accounts: [deployerKey as string],
    },
  },
}

export default config
