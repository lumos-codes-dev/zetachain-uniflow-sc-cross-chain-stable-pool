/* eslint-disable max-len */
import * as dotenv from "dotenv";
dotenv.config();

import hre from "hardhat";

const { ethers } = hre;
const { parseUnits } = ethers.utils;
import { Router__factory, TestToken__factory } from "../../typechain-types";

const initializeUsdcTokens = [
    "0x4bC32034caCcc9B7e02536945eDbC286bACbA073", // USDC.ARBSEP
    // "0x7c8dDa80bbBE1254a7aACf3219EBe1481c6E01d7", // USDC.BSC
    // "0x8344d6f84d26f998fa070BbEA6D2E15E359e2641", // USDC.FUJI
    "0xcC683A782f4B30c138787CB5576a86AF66fdc31d", // USDC.SEPOLIA
    "0xd0eFed75622e7AA4555EE44F296dA3744E3ceE19" // USDC.BASESEPOLIA
    // "0xe573a6e11f8506620F123DBF930222163D46BCB6", // USDC.AMOY
];

const ROUTER_TEST_ADDRESS = "0xB4a9584e508E1dB7ebb8114573D39A69189CE1Ca"; // ZetaChain Testnet Router address
// const STABLE_TEST_POOL_ADDRESS = "0x8c8b1538e753C053d96716e5063a6aD54A3dBa47"; // uETH Stable Pool address on ZetaChain Testnet
const STABLE_TEST_POOL_ADDRESS = "0xCe83BFd5171237aF064A4C6203Ff3902D44fd4BD"; // uUSDC Stable Pool address on ZetaChain Testnet

async function main() {
    const [caller] = await ethers.getSigners();
    const networkName = hre.network.name.toString();

    const routerContract = Router__factory.connect(ROUTER_TEST_ADDRESS, caller);

    console.log("\n --- Initialize Pool on Router --- \n");
    console.log("* ", caller.address, "- Caller address");
    console.log("* ", networkName, "- Network name");
    console.log("* ", ROUTER_TEST_ADDRESS, "- Contract address");
    console.log("\n --- ------- ---- --- ");

    // const initializeAmount = parseUnits("100", 18);
    const initializeAmount = "5";
    const initializeAmounts = [];

    // Approve tokens for the router
    for (const tokenAddress of initializeUsdcTokens) {
        const tokenContract = TestToken__factory.connect(tokenAddress, caller);
        const decimals = await tokenContract.decimals();
        const amount = parseUnits(initializeAmount, decimals);
        const allowance = await tokenContract.allowance(caller.address, ROUTER_TEST_ADDRESS);
        if (allowance.lt(amount)) {
            const approvalTx = await tokenContract.approve(ROUTER_TEST_ADDRESS, amount);
            await approvalTx.wait();
            console.log(`Approved ${tokenAddress} tokens for the router.`);
        }
        initializeAmounts.push(amount);
    }
    const initializePoolTx = await routerContract.initialize(
        STABLE_TEST_POOL_ADDRESS,
        initializeUsdcTokens,
        initializeAmounts,
        parseUnits("0", 18), // min Bpt AmountOut
        false, // weth is eth
        "0x" // No additional user data
    );

    await initializePoolTx.wait();

    console.log(`\n✅ Hash of Pool Initialization TX: ${initializePoolTx.hash}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
