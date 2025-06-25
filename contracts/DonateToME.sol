// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonateToMe {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // Automatically forwards ETH to your wallet
    receive() external payable {
        owner.transfer(msg.value);
    }
}
