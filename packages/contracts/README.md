# Smart Contracts

This project demonstrates how to add smart contracts to your project using [Hardhat](https://hardhat.org/docs) or [Foundry](https://book.getfoundry.sh/). It provides a sample `Message` contract, a test and deployment scripts.

Try running some of the following tasks:

```shell
$ yarn build
$ yarn deploy
$ yarn test
$ yarn coverage
```

or

```shell
$ forge build
$ forge test
$ forge snapshot
```

## Deploy

Once you're ready to deploy your contracts, setup a deployer account using `DEPLOYER_KEY` and try to run e.g.

```shell
$ yarn deploy --network sepolia
```

or

```shell
$ forge script scripts/Message.s.sol:MessageScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

Note that you need testnet Ethers for that. More info and faucet links can be found on [Sepolia Dev](https://sepolia.dev/). You can set up different networks using [Hardhat's network configuration](https://hardhat.org/hardhat-runner/docs/config#networks-configuration).

## Verify

Contracts are automatically verified on Etherscan if you've set up the `ETHERSCAN_API_KEY` environment variable. You can also verify contracts manually using

```shell
$ yarn verify
```

## Wagmi CLI

The front-end uses the [Wagmi CLI](https://wagmi.sh/cli/getting-started) to automatically generate types and default hooks for your contracts. You can find the generated files in `src/abi.test`.

```shell
$ yarn wagmi
```
