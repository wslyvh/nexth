# Smart Contracts

This project demonstrates how to add smart contracts to your project using [Foundry](https://book.getfoundry.sh/). It provides a sample `Message` contract, a test and deployment scripts.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Message.s.sol:MessageScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Working with a local network

Foundry comes with local network [anvil](https://book.getfoundry.sh/anvil/index.html) baked in, and allows us to deploy to our local network for quick testing locally.

To start a local network run:

```
make anvil
```

This will spin up a local blockchain with a determined private key, so you can use the same private key each time.

Then, you can deploy to it with:

```
make deploy-anvil contract=<CONTRACT_NAME>
```

Similar to `deploy-sepolia` or `deploy-mumbai`

### Working with other chains

To add a chain, you'd just need to make a new entry in the `Makefile`, and replace `<YOUR_CHAIN>` with whatever your chain's information is.

```
deploy-<YOUR_CHAIN> :; @forge script script/${contract}.s.sol --rpc-url ${<YOUR_CHAIN>_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast -vvvv

```
