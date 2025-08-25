// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/UniversalContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IGatewayZEVM.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IZRC20.sol";
import {SwapHelperLib} from "@zetachain/toolkit/contracts/SwapHelperLib.sol";

contract UniversalStableSwap is UniversalContract, Ownable {
    /// Represents the instance of the GatewayZEVM contract deployed on ZetaChain.
    IGatewayZEVM public immutable gateway;
    /// Represents the instance of the UniswapRouter contract deployed on ZetaChain.
    address public immutable uniswapRouter;
    /// Stores if token is whitelisted.
    mapping(address => bool) isTokenWhitelisted;

    /// Errors
    error InvalidAddress();
    error Unauthorized();
    error ApproveFailed();

    /// Modifiers
    modifier onlyGateway() {
        if (msg.sender != address(gateway)) revert Unauthorized();
        _;
    }

    constructor(
        address payable _gateway,
        address _uniswapRouter
    ) Ownable(msg.sender) {
        if (_gateway == address(0) || _uniswapRouter == address(0)) revert InvalidAddress();
        // Set the immutables.
        gateway = IGatewayZEVM(_gateway);
        uniswapRouter = _uniswapRouter;
    }

    /// @notice Should whitelist the ZRC20 token address.
    /// @dev Callable only by owner.
    function whitelist(address token) external onlyOwner {
        if (token == address(0)) revert InvalidAddress();
        isTokenWhitelisted[token] = true;
    }

    /// @notice Should handle cross-chain stables transfer.
    /// @dev should swap incoming ZRC20 to the output ZRC20 stable.
    function onCall(
        MessageContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message 
    ) external override onlyGateway {
        // Decode message to get the target token address.
        address targetToken = abi.decode(message, (address));
        // Check if tokens are whitelisted.
        if (!isTokenWhitelisted[zrc20] || !isTokenWhitelisted[targetToken]) revert InvalidAddress();
        // Swap stable in order to pay for gas fee.
        (address gasZRC20, uint256 gasFee) = IZRC20(targetToken).withdrawGasFee();
        uint256 inputForGas = SwapHelperLib.swapTokensForExactTokens(uniswapRouter, zrc20, gasFee, gasZRC20, amount);
        uint256 swapAmount = amount - inputForGas;
        // Swap input to the desired token.
        uint256 outputAmount = SwapHelperLib.swapExactTokensForTokens(uniswapRouter, zrc20, swapAmount, targetToken, 0);
        // Create token approvals.
        if (!IZRC20(gasZRC20).approve(address(gateway), gasFee)) revert ApproveFailed();
        if (!IZRC20(targetToken).approve(address(gateway), outputAmount)) revert ApproveFailed();
        // Create default revert options struct.
        RevertOptions memory revertOptions;
        // Initiate cross chain withdraw call.
        gateway.withdraw(context.sender, outputAmount, targetToken, revertOptions);
    }
}