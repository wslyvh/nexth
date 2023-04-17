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
      watchContractEvent: true,
    }),
    hardhat({
      project: './contracts',
      deployments: {
        Passport: {
          11155111: '0x416CC531d3409786825155168003a5d574c4aD75',
          10: '0x1846fB181a12644dEc6af707b23B39d2D19C1879',
        },
      },
    }),
  ],
})
