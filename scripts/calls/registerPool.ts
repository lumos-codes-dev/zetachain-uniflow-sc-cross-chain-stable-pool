/* eslint-disable max-len */
import * as dotenv from "dotenv";
dotenv.config();

import hre from "hardhat";
const { ethers } = hre;

import { VaultExtension__factory } from "../../typechain-types";
import { AddressZero, Zero } from "../../test/helpers";

enum TokenType {
    STANDARD = 0,
    WITH_RATE = 1
}

// uETH pool
// const initializeEthTokens = [
//     "0x05BA149A7bd6dC1F937fA9046A9e05C05f3b18b0", // sETH.SEPOLIA
//     "0x1de70f3e971B62A0707dA18100392af14f7fB677", // ETH.ARBSEP
//     "0x236b0DE675cC8F46AE186897fCCeFe3370C9eDeD" // ETH.BASESEPOLIA
// ];

// uUSDC
const initializeUsdcTokens = [
    "0x4bC32034caCcc9B7e02536945eDbC286bACbA073", // USDC.ARBSEP
    // "0x7c8dDa80bbBE1254a7aACf3219EBe1481c6E01d7", // USDC.BSC
    // "0x8344d6f84d26f998fa070BbEA6D2E15E359e2641", // USDC.FUJI
    "0xcC683A782f4B30c138787CB5576a86AF66fdc31d", // USDC.SEPOLIA
    "0xd0eFed75622e7AA4555EE44F296dA3744E3ceE19" // USDC.BASESEPOLIA
    // "0xe573a6e11f8506620F123DBF930222163D46BCB6" // USDC.AMOY
];

const chainIds = [
    421614, // ARBSEP
    // 97, // BSC
    // 43113, // FUJI
    11155111, // SEPOLIA
    84532 // BASESEPOLIA
    // 80002 // AMOY
];

const sortedTokenAddresses = initializeUsdcTokens.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

console.log("Sorted token addresses:", sortedTokenAddresses);

const VAULT_TEST_ADDRESS = "0x1541CA9df8774D72Bc2f56DE44f5C019Cea4F180"; // ZetaChain Testnet Vault address
// const STABLE_TEST_POOL_ADDRESS = "0x8c8b1538e753C053d96716e5063a6aD54A3dBa47"; // uETH Stable Pool address on ZetaChain Testnet
const STABLE_TEST_POOL_ADDRESS = "0xCe83BFd5171237aF064A4C6203Ff3902D44fd4BD"; // uUSDC Stable Pool address on ZetaChain Testnet

async function main() {
    const [deployer] = await ethers.getSigners();
    const networkName = hre.network.name.toString();

    const vaultExtensionContract = VaultExtension__factory.connect(VAULT_TEST_ADDRESS, deployer);

    console.log("\n --- Register Pool Data --- \n");
    console.log("* ", deployer.address, "- Caller address");
    console.log("* ", networkName, "- Network name");
    console.log("* ", VAULT_TEST_ADDRESS, "- Contract address");
    console.log("\n --- ------- ---- --- ");

    const tokenConfigs = initializeUsdcTokens.map((tokenAddress, index) => ({
        token: tokenAddress,
        chainId: chainIds[index],
        tokenType: TokenType.STANDARD,
        rateProvider: AddressZero,
        paysYieldFees: false
    }));

    const roleAccounts = {
        pauseManager: deployer.address,
        swapFeeManager: deployer.address,
        poolCreator: deployer.address
    };

    const liquidityManagement = {
        disableUnbalancedLiquidity: false,
        enableAddLiquidityCustom: false,
        enableRemoveLiquidityCustom: false,
        enableDonation: false
    };

    const registerPoolTx = await vaultExtensionContract.registerPool(
        STABLE_TEST_POOL_ADDRESS,
        tokenConfigs,
        1000000000000, // swapFeePercentage,
        Zero, // pauseWindowEndTime
        false, // protocolFeeExempt
        roleAccounts,
        AddressZero, // poolHooksContract
        liquidityManagement,
        {
            gasLimit: 5000000
        }
    );

    await registerPoolTx.wait();

    console.log(`\n✅ Hash of Pool Registration TX: ${registerPoolTx.hash}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
