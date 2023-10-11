// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import 'forge-std/Test.sol';

//import "forge-std/console.sol";

contract Message is Test {
  Message public message;

  function setUp() public {
    message = new Message();
  }
}
