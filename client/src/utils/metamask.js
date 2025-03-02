import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import showConsole from "./common-functions";

export const connectToMetamask = async () => {
  if (window.ethereum) {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }
    return new Promise((resolve, reject) => {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const chainId = window.ethereum.chainId;
          const accounts = await window.web3.eth.getAccounts();
          const balance = await window.web3.eth.getBalance(accounts[0]);
          resolve({ chainId, account: accounts[0], balance });
        })
        .catch((error) => {
          reject({ chainId: null, account: null, balance: null });
        });
    });
  }
};

export const GET_ustdr_address = async (tokenAddress) => {
  const Web3 = require("web3");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    )
  );
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://dataseed2.redlightscan.finance/'));
  return new Promise((resolve, reject) => {
    const minABI = [
      {
        inputs: [],
        name: "getUSDTRAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(minABI, tokenAddress);

    contract.methods
      .getUSDTRAddress()
      .call()
      .then((resp) => {
        // console.log("BALANCE OF RUSD 12",resp)
        resolve(resp);
      })
      .catch((error) => {
        // console.log("BALANCE OF RUSD",error)
        reject(error);
      });
  });
};

export const switchingToRLC = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "Testnet BSC",
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com/"],
              nativeCurrency: {
                symbol: "TBSC",
                decimals: 18,
              },
            },
          ],
        });
      } catch (addError) {
        // showConsole("adding binance error   ::  ", addError)
      }
    }
    // showConsole("Failed to switch to the network")
  }
};

export const set_operator = async (tokenaddress, operator) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_operator",
            type: "address",
          },
        ],
        name: "setOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(tokenaddress, minABI, signer);
    await contract
      .setOperator(operator, {
        // gasLimit: 300000,
      })
      .then(async (res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const get_operator = async (tokenAddress) => {
  const Web3 = require("web3");
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://dataseed2.redlightscan.finance/'));
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://dataseed2.redlightscan.finance/")
  );
  return new Promise((resolve, reject) => {
    const minABI = [
      {
        inputs: [],
        name: "getOperator",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(minABI, tokenAddress);

    contract.methods
      .getOperator()
      .call()
      .then((resp) => {
        // console.log("BALANCE OF RUSD 12",resp)
        resolve(resp);
      })
      .catch((error) => {
        // console.log("BALANCE OF RUSD",error)
        reject(error);
      });
  });
};

export const get_Owner = async (tokenAddress) => {
  const Web3 = require("web3");
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://dataseed2.redlightscan.finance/'));
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://dataseed2.redlightscan.finance/")
  );
  return new Promise((resolve, reject) => {
    const minABI = [
      {
        inputs: [],
        name: "getOperator",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(minABI, tokenAddress);

    contract.methods
      .getOperator()
      .call()
      .then((resp) => {
        // console.log("BALANCE OF RUSD 12",resp)
        resolve(resp);
      })
      .catch((error) => {
        // console.log("BALANCE OF RUSD",error)
        reject(error);
      });
  });
};
export const set_owner = async (tokenaddress, operator) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let contract = new ethers.Contract(tokenaddress, minABI, signer);
    await contract
      .transferOwnership(operator, {
        // gasLimit: 300000,
      })
      .then(async (res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
