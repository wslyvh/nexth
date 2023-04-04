// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import './Verifier.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Passport is ERC721, ERC721Enumerable, Verifier {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  mapping(address => uint16) public scores;

  constructor() ERC721('Gitcoin Passport Score', 'GPS') {}

  function safeMint(address to, uint16 score, bytes memory signature) public {
    verifySignature(to, score, signature);

    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    scores[to] = score;
    _safeMint(to, tokenId);
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
    scores[to] = 0;
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
