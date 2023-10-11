// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import {Test} from 'forge-std/Test.sol';
import {Message} from '../src/Message.sol';

//import "forge-std/console.sol";

contract MessageTest is Test {
  Message public message;

  function setUp() public {
    message = new Message();
  }
}
