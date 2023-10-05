import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions({
      getContract: true,
      readContract: true,
      prepareWriteContract: true,
      watchContractEvent: false,
    }),
    hardhat({
      project: '../contracts',
      deployments: {
        Message: {
          11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
        },
      },
    }),
  ],
})
