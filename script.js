const connectWalletBtn = document.getElementById("connectWallet");
const mintBtn = document.getElementById("mintSBT");
const walletAddressP = document.getElementById("walletAddress");
const statusP = document.getElementById("status");

let provider;
let signer;
let userAddress;

// Replace with your SBT contract address
const contractAddress = "0x04F805Ea014c7c28101CA62d2c7f83fC480ddaba";

// Minimal ABI for minting (update if your contract has different function)
const contractABI = [
  "function mint() public"
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
    const tx = await contract.mint();
    await tx.wait();
    statusP.innerText = "SBT minted successfully!";
  } catch (err) {
    console.error(err);
    statusP.innerText = "Minting failed: " + err.message;
  }
};
