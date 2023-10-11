// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

// import "hardhat/console.sol";

contract Message {
    string public message = "Quickly ship Web3 Apps";

    event SetMessage(address sender, string purpose);

    constructor() { }

    function setMessage(string memory _message) public payable {
        message = _message;
        // console.log(msg.sender, "is updating message to", _message);
        emit SetMessage(msg.sender, _message);
    }
}
