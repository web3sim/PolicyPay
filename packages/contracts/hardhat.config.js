require("@nomiclabs/hardhat-ethers");
const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

if (!process.env.BASE_SEPOLIA_RPC_URL && process.env.OLAS_RPC_URL) {
  process.env.BASE_SEPOLIA_RPC_URL = process.env.OLAS_RPC_URL;
}

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || process.env.OLAS_PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84532,
    },
  },
};
