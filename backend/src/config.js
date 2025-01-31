require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "DGENERATE POKER PRIMATES";
const description = "LET'S FACE IT! THERE'S A DEGENERATE APE IN ALL OF US!";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" },
      { name: "Torso Charc" },
      { name: "Eyes Background CHARC" },
      { name: "EM charc" },
      { name: "borders" },
      { name: "Headgear" },
      { name: "Aces" },
      { name: "Thin Border" },
    ],
  },
  {    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Background" },
      { name: "Torso brown" },
      { name: "Eyes Background BROWN" },
      { name: "eyes mouth brown" },
      { name: "borders" },
      { name: "Headgear" },
      { name: "Aces" },
      { name: "Thin Border" },
    ],}, 
    { 
    growEditionSizeTo: 15,
    layersOrder: [
      { name: "Background" },
      { name: "Torso pale" },
      { name: "Eyes Background PALE" },
      { name: "eyes mouth pale" },
      { name: "borders" },
      { name: "Headgear" },
      { name: "Aces" }, 
      { name: "Thin Border" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1572,
  height: 2200,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://dgenpokerprimates.co", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'DEGENERATEPOKERPRIMATES';
const CONTRACT_SYMBOL = 'DPP';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x74A7b06F3B1C618A58d24eaB4560962F616D98eE';
const TREASURY_ADDRESS = '0x74A7b06F3B1C618A58d24eaB4560962F616D98eE';
const MAX_SUPPLY = 2000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 11; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-16T10:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-04-13T11:00:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x74A7b06F3B1C618A58d24eaB4560962F616D98eE"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0x8093B42762820C3fA6631F4e08e4Fe4970394D8D", "0x74A7b06F3B1C618A58d24eaB4560962F616D98eE","0x2b1ca3287d0644b8b30bc847b6ce6e2c4386c749","0x088Cc9C4b7eCD31eFfa52d1537620c6006Aed9fe",
"0x6cfF5a4a4BFBEa7F133354Fb7Cad938A8E6A0217","0xba47f65368998abfA933B6f163b72Aebe912fEBA", "0x5c87fd391e29801C0552720C68bE507c211e9d26", "0x391A2E2e0b572775AdF0D7838F97d63EC4DB5779", "0x98a4DDe5eA6e5B579Cf591d0aeACC77a02699ce7", "0x93137E76bDa112a57D0ee4D135b809a96BC8824F"]; // only update if you want to manually set the whitelisted addresses
// ** OPTIONAL **
let CONTRACT_ADDRESS = "0x2b1Ca3287d0644b8B30bC847b6CE6e2C4386C749"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "JUST CHILLIN AND HAVIN A BANANA... REVEALING SOON"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafkreielxmm4elx7ahtezt6adjrtz2m7ti7ap3i5gtmdzlfm23dljslixe"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
