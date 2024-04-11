import { defineConfig } from '@wagmi/cli'
import { actions, hardhat, foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    hardhat({
      project: '../hardhat',
      deployments: {
        Message: {
          11155111: '0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34',
        },
      },
    }),
    foundry({
      project: '../foundry',
      deployments: {
        Message: {
          11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
        },
      },
    }),
  ],
})
