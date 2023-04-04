//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Verifier is Ownable {
  using ECDSA for bytes32;

  function createMessage(address account, uint16 score) public view returns (bytes32) {
    return keccak256(abi.encode(account, score, owner()));
  }

  function verifySignature(address account, uint16 score, bytes memory signature) public view returns (bool) {
    bytes32 message = createMessage(account, score).toEthSignedMessageHash();

    require(message.recover(signature) == address(owner()), '!INVALID_SIGNATURE!');

    return true;
  }
}
