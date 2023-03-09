// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NexthFT is ERC721 {
    constructor() ERC721("NexthFT", "NFT") { }
}