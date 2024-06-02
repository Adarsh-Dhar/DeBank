// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YieldToken is ERC20 {
    address public vault;

    constructor() ERC20("Yield Token", "YTRD") {
        vault = msg.sender;
    }

    modifier onlyVault() {
        require(msg.sender == vault, "Only vault can mint tokens");
        _;
    }

    function mint(address to, uint256 amount) external onlyVault {
        _mint(to, amount);
    }
}
