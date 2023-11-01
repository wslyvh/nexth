
-include .env

# Clean the repo
clean  :; forge clean

anvil :; anvil -m 'test test test test test test test test test test test junk'

deploy-sepolia :; @forge script script/${contract}.s.sol --rpc-url ${SEPOLIA_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

deploy-mumbai :; @forge script script/${contract}.s.sol --rpc-url ${MUMBAI_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${POLYSCAN_API_KEY}  -vvvv

# This is the private key of account from the mnemonic from the "make anvil" command
deploy-anvil :; @forge script script/${contract}.s.sol --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

-include ${FCT_PLUGIN_PATH}/makefile-external