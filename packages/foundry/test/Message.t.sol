// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import {Test} from 'forge-std/Test.sol';
import {Message} from '../src/Message.sol';

//import "forge-std/console.sol";

contract MessageTest is Test {
  event SetMessage(address sender, string purpose);

  Message public message;

  function setUp() public {
    message = new Message();
  }

  function testCorrectDefaultMessage() public {
    assertEq(message.message(), 'Quickly ship Web3 Apps');
  }

  function testUpdateMessage() public {
    message.setMessage('Build unstoppable Apps');
    assertEq(message.message(), 'Build unstoppable Apps');
  }

  function testEmitMessageEvent() public {
    address owner = address(1);
    vm.startPrank(owner);
    vm.expectEmit(true, true, true, true);
    emit SetMessage(owner, 'Build unstoppable Apps');
    message.setMessage('Build unstoppable Apps');
    vm.stopPrank();
  }
}
