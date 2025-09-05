const connectWalletBtn = document.getElementById("connectWallet");
const mintBtn = document.getElementById("mintSBT");
const walletAddressP = document.getElementById("walletAddress");
const statusP = document.getElementById("status");

let provider;
let signer;
let userAddress;

// ✅ Your deployed contract address on TRUST testnet
const contractAddress = "0x04F805Ea014c7c28101CA62d2c7f83fC480ddaba";

// ✅ Replace ABI with the correct one from your contract
const contractABI = [
  "function mint(address to) public"
  // OR "function safeMint(address to, uint256 tokenId) public"
];

connectWalletBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
  walletAddressP.innerText = `Connected: ${userAddress}`;
  mintBtn.disabled = false;
};

mintBtn.onclick = async () => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    statusP.innerText = "Minting SBT...";

    // ✅ Adjust call depending on your contract function
    // Example 1: if function mint(address)
    const tx = await contract.mint(userAddress);

    // Example 2: if function safeMint(address, uint256)
    // const tx = await contract.safeMint(userAddress, 1);

    await tx.wait();
    statusP.innerText = "SBT minted successfully!";
  } catch (err) {
    console.error(err);
    statusP.innerText = "Minting failed: " + err.message;
  }
};
