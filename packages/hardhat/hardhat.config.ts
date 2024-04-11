import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-verify'
import { CONFIG } from './utils/config'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      mainnet: CONFIG.ETHERSCAN_API_KEY,
      sepolia: CONFIG.ETHERSCAN_API_KEY,
      optimisticEthereum: CONFIG.OPTIMISTIC_API_KEY,
    },
  },
  sourcify: {
    enabled: true,
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
      accounts: [CONFIG.DEPLOYER_KEY],
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${CONFIG.INFURA_API_KEY}`,
      accounts: [CONFIG.DEPLOYER_KEY],
    },
    optimism: {
      chainId: 10,
      url: 'https://mainnet.optimism.io/',
      accounts: [CONFIG.DEPLOYER_KEY],
    },
    base: {
      chainId: 8453,
      url: 'https://mainnet.base.org',
      accounts: [CONFIG.DEPLOYER_KEY],
    },
  },
}

export default config
