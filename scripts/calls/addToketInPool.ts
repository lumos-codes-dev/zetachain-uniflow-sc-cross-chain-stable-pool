/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dotenv from "dotenv";
dotenv.config();

import hre from "hardhat";
const { ethers } = hre;

import { Vault__factory } from "../../typechain-types";
import { AddressZero, parseEther } from "../../test/helpers";

const NEW_TOKEN_ADDRESS = "0x30e7d25774507630733d1E277E7B664b1Dee757e";

const VAULT_TEST_ADDRESS = "0xE0De5067454B2ce20cd74605C9D85b77bcE05DeD"; // BASE SEPOLIA
const STABLE_TEST_POOL_ADDRESS = "0x914d061Ec7A9aE41b00b7d499972E48eB9013883";

async function main() {
    const [deployer] = await ethers.getSigners();
    const networkName = hre.network.name.toString();

    const vaultContract = Vault__factory.connect(VAULT_TEST_ADDRESS, deployer);

    console.log("\n --- Add New Token --- \n");
    console.log("* ", deployer.address, "- Caller address");
    console.log("* ", networkName, "- Network name");
    console.log("* ", VAULT_TEST_ADDRESS, "- Contract address");
    console.log("\n --- ------- ---- --- ");

    enum TokenType {
        STANDARD = 0,
        WITH_RATE = 1
    }

    const tokenInfo = {
        token: NEW_TOKEN_ADDRESS,
        chainId: 1,
        tokenType: TokenType.STANDARD,
        rateProvider: AddressZero,
        paysYieldFees: false
    };

    const addNewTokenTx = await vaultContract.addTokenToPool(STABLE_TEST_POOL_ADDRESS, tokenInfo, parseEther("1000"));

    await addNewTokenTx.wait();

    console.log(`\n✅ Hash of Add New Token TX: ${addNewTokenTx.hash}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
