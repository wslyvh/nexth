import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      url: 'https://rpc.sepolia.dev',
      accounts: [process.env.DEPLOYER_KEY ?? '0xFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000000000000'],
    },
  },
}

export default config
