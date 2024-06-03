// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract YieldMarketplace {
   

    address public yieldToken;
    address public owner;

    struct Order {
        address trader;
        uint256 amount;
        uint256 price;
        bool isBuy; // true for buy order, false for sell order
    }

    Order[] public orderBook;

    event NewOrder(address indexed trader, uint256 indexed orderId, uint256 amount, uint256 price, bool isBuy);
    event OrderFilled(uint256 indexed orderId, address indexed buyer, address indexed seller, uint256 amount, uint256 price);

    constructor(address _yieldToken) {
        yieldToken = _yieldToken;
        owner = msg.sender;
    }

    function placeOrder(uint256 amount, uint256 price, bool isBuy) external {
        require(price > 0, "Price must be greater than zero");
        require(amount > 0, "Amount must be greater than zero");
        require(IERC20(yieldToken).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        orderBook.push(Order({
            trader: msg.sender,
            amount: amount,
            price: price,
            isBuy: isBuy
        }));

        emit NewOrder(msg.sender, orderBook.length - 1, amount, price, isBuy);
    }

    function fillOrder(uint256 orderId, uint256 amount) external {
        require(orderId < orderBook.length, "Invalid order ID");
        Order storage order = orderBook[orderId];

        require(order.amount >= amount, "Insufficient amount in order");
        require(IERC20(yieldToken).transferFrom(msg.sender, order.trader, amount), "Transfer failed");

        if (order.isBuy) {
            // Buyer sends tokens, Seller receives payment
            uint256 totalPrice = amount.mul(order.price).div(1e18);
            require(IERC20(yieldToken).transferFrom(order.trader, msg.sender, totalPrice), "Transfer failed");

            emit OrderFilled(orderId, msg.sender, order.trader, amount, totalPrice);
        } else {
            // Seller sends tokens, Buyer receives tokens
            require(IERC20(yieldToken).transferFrom(order.trader, msg.sender, amount), "Transfer failed");

            uint256 totalPrice = amount.mul(order.price).div(1e18);
            require(IERC20(yieldToken).transferFrom(msg.sender, order.trader, totalPrice), "Transfer failed");

            emit OrderFilled(orderId, msg.sender, order.trader, amount, totalPrice);
        }

        order.amount = order.amount.sub(amount);
        if (order.amount == 0) {
            // Remove filled order
            orderBook[orderId] = orderBook[orderBook.length - 1];
            orderBook.pop();
        }
    }

    function getOrderBookLength() external view returns (uint256) {
        return orderBook.length;
    }

    function getOrder(uint256 orderId) external view returns (
        address trader,
        uint256 amount,
        uint256 price,
        bool isBuy
    ) {
        require(orderId < orderBook.length, "Invalid order ID");
        Order storage order = orderBook[orderId];
        return (order.trader, order.amount, order.price, order.isBuy);
    }

    function withdrawTokens(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        IERC20(yieldToken).transfer(to, amount);
    }

    function withdrawETH(address payable to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        to.transfer(amount);
    }
}
