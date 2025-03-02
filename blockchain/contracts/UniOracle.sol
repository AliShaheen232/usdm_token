// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IUniswapV2Factory.sol";
import "./IUniswapV2Router02.sol";
import "./IERC20.sol";
import "./Ownable.sol";

contract UniOracle is Ownable {
    // IUniswapV2Router02 private router = IUniswapV2Router02(0x5dC5431D67cA080b7c4bf7CB77f1B3e6FeD0F1AC); //RLC TESTNET Router
    // IUniswapV2Router02 router = IUniswapV2Router02(0xC6A32f7c1796E699f97D89A75DDD2C0e8Ca8358A);   //RLC mainnet Router
    IUniswapV2Router02 private router;
    // IUniswapV2Router02 private router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); //Ether

    uint256 private baseprice;

    address public biToken;
    address public triToken;
    address public pair;
    IUniswapV2Factory public factory;

    constructor() {
        baseprice = 1 * 10 ** 18;
        router = IUniswapV2Router02(0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3); // BSC testnet
    }

    function createPair(
        address _biToken,
        address _triToken
    ) public returns (address) {
        factory = IUniswapV2Factory(router.factory());
        return pair = factory.createPair(_biToken, _triToken);
    }

    function addliquidity() public {
        uint256 biAmount = 1000000 * 10 ** 18;
        uint256 triAmount = 1000000 * 10 ** 18;

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

    function setBasePrice(uint256 _price) public onlyOwner {
        baseprice = _price;
    }

    function setAddress(address _biToken, address _triToken) public onlyOwner {
        biToken = _biToken;
        triToken = _triToken;
    }

    function getBasePrice() public view returns (uint256) {
        return baseprice;
    }

    function getAmount()
        public
        view
        returns (uint256 amount0, uint256 amount1)
    {
        address[] memory path;
        uint256[] memory amounts;

        path = new address[](2);
        path[0] = biToken;
        path[1] = triToken;

        amounts = router.getAmountsOut(1000000000000000000, path);
        amount0 = amounts[0];
        amount1 = amounts[1];

        return (amount0, amount1);
    }

    function getChangePercentage() public view returns (uint256, bool) {
        uint256 percentage;
        bool direction;
        (, uint256 price) = getAmount();

        if (baseprice <= price) {
            uint256 up = price - baseprice;
            percentage = ((up * 100) / baseprice);
            direction = true;
            return (percentage, direction);
        } else {
            uint256 up = baseprice - price;
            percentage = ((up * 100) / baseprice);

            direction = false;

            return (percentage, direction);
        }
    }
}
