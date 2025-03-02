// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IUniswapV2Factory.sol";
import "./IUniswapV2Router02.sol";
import "./IERC20.sol";
import "./Ownable.sol";

contract LqOP is Ownable {
    IUniswapV2Router02 private router;

    uint256 private baseprice;

    address public biToken;
    address public triToken;
    address public pair;
    IUniswapV2Factory public factory;

    constructor() {
        baseprice = 1 * 10 ** 18;
        router = IUniswapV2Router02(0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3); // BSC testnet
    }

    function addliquidity() public {
        uint256 biAmount = 10000 * 10 ** 18;
        uint256 triAmount = 10000 * 10 ** 18;

        IERC20(biToken).approve(address(router), biAmount);
        IERC20(triToken).approve(address(router), triAmount);
        router.addLiquidity(
            biToken,
            triToken,
            biAmount,
            triAmount,
            0,
            0,
            msg.sender,
            block.timestamp
        ); /// lp token receipent
    }
}
