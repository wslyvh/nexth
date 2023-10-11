import { HardhatUserConfig } from 'hardhat/config'
import fs from 'fs'
import { join } from 'path'
import dotenv from 'dotenv'
import 'hardhat-preprocessor'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config() // project root
dotenv.config({ path: join(process.cwd(), '../../.env') }) // workspace root

type Remapping = [string, string]

const getRemappings: () => Remapping[] = () => {
  return fs
    .readFileSync('remappings.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [key, value] = line.trim().split('=')
      if (!key || !value) {
        throw new Error(`Invalid mapping format: "${line}". Each mapping must be in "key=value" format.`)
      }
      return [key, value]
    })
}

const deployerKey = process.env.DEPLOYER_KEY
if (!deployerKey) {
  console.warn('DEPLOYER_KEY not found in .env file. Running with default config')
}
const etherscanApiKey = process.env.ETHERSCAN_API_KEY ?? ''
if (!etherscanApiKey) {
  console.warn('ETHERSCAN_API_KEY not found in .env file. Will skip Etherscan verification')
}
const polygonApiKey = process.env.POLYSCAN_API_KEY ?? ''
if (!polygonApiKey) {
  console.warn('POLYSCAN_API_KEY not found in .env file. Will skip Etherscan verification')
}

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      mainnet: etherscanApiKey,
      sepolia: etherscanApiKey,
      polygonMumbai: polygonApiKey,
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
    mumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts: [deployerKey as string],
    },
  },
  paths: {
    sources: './src', // Use ./src rather than ./contracts as Hardhat expects
    cache: './cache_hardhat', // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace)
            }
          })
        }
        return line
      },
    }),
  },
}

export default config
