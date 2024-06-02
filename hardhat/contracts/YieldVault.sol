// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YieldVault {
    address public yieldToken;
    address public owner;

    struct FixedYieldAgreement {
        address depositor;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        uint256 yieldAmount;
        bool withdrawn;
    }

    mapping(uint256 => FixedYieldAgreement) public fixedYieldAgreements;
    uint256 public agreementCount;

    constructor(address _yieldToken) {
        yieldToken = _yieldToken;
        owner = msg.sender;
    }

    function deposit(uint256 amount, uint256 duration) external {
        // Ensure the caller has approved this contract to transfer their tokens
        require(IERC20(yieldToken).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint256 yieldAmount = calculateYield(amount, duration);

        // Mint YieldTokens to the depositor
        IERC20(yieldToken).transfer(msg.sender, yieldAmount);

        // Record the fixed yield agreement
        fixedYieldAgreements[agreementCount] = FixedYieldAgreement({
            depositor: msg.sender,
            amount: amount,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            yieldAmount: yieldAmount,
            withdrawn: false
        });

        agreementCount++;
    }

    function withdrawYield(uint256 agreementId) external {
        require(agreementId < agreementCount, "Invalid agreement ID");
        require(fixedYieldAgreements[agreementId].depositor == msg.sender, "Only depositor can withdraw yield");
        require(!fixedYieldAgreements[agreementId].withdrawn, "Yield already withdrawn");
        require(block.timestamp >= fixedYieldAgreements[agreementId].endTime, "Agreement not yet matured");

        // Mark agreement as withdrawn
        fixedYieldAgreements[agreementId].withdrawn = true;

        // Transfer YieldTokens to the depositor
        IERC20(yieldToken).transfer(msg.sender, fixedYieldAgreements[agreementId].yieldAmount);
    }

    function calculateYield(uint256 amount, uint256 duration) internal pure returns (uint256) {
        // Simplified for illustration, you should implement your yield calculation logic here
        // For example, fixed yield based on a percentage
        uint256 yieldPercentage = 5; // 5% annual yield
        uint256 yieldAmount = amount * yieldPercentage * duration / (365 days) / 100;
        return yieldAmount;
    }

    // Other functions can include getting agreement details, balance checks, etc.
}
