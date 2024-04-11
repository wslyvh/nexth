# Smart Contracts

This project demonstrates how to add smart contracts to your project using [Hardhat](https://hardhat.org/docs). It provides a sample `Message` contract, a test and deployment scripts.

Try running some of the following tasks:

```
yarn build
yarn deploy
yarn test
yarn coverage
```

## Deploy

Once you're ready to deploy your contracts, setup a deployer account using `DEPLOYER_KEY` and try to run e.g.

```
yarn deploy --network sepolia
```

Note that you need testnet Ethers for that. More info and faucet links can be found on [Sepolia Dev](https://sepolia.dev/). You can set up different networks using [Hardhat's network configuration](https://hardhat.org/hardhat-runner/docs/config#networks-configuration).

## Verify

Contracts are automatically verified on Etherscan if you've set up the `ETHERSCAN_API_KEY` environment variable. You can also verify contracts manually using

```
yarn verify <address> --network <network>
```

It is recommend to verifying manually after deployment as it also automatically verifies contracts on [Sourcify](https://sourcify.dev/).

## Wagmi CLI

The front-end uses the [Wagmi CLI](https://wagmi.sh/cli/getting-started) to automatically generate types and default hooks for your contracts.

You need to run the following command from `packages/app`, which will generate the files in the same package at `src/abi.test`.

```
yarn wagmi
```
