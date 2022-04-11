import { ethers } from "ethers";
import { MintTokenOption, MintTokenResponse, SavedContract } from "./lib/types";

export default class ContractToken {
  protected contractData: SavedContract;
  protected provider: ethers.providers.Web3Provider;

  constructor() {
    this._initContractData();
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  mint(option?: MintTokenOption): Promise<MintTokenResponse> {
    return new Promise(async (resolve, _reject) => {
      try {
        const signer = this.provider.getSigner();
        const account = await signer.getAddress();

        option.address = !option.address ? account : option.address;

        const contract = new ethers.Contract(
          this.contractData.address,
          this.contractData.abi,
          signer
        );
        const minting: ethers.ContractTransaction = await contract.mint(
          account,
          1,
          "0x00"
        );
        const mined: ethers.ContractReceipt = await minting.wait();

        console.log(minting, mined);
        resolve({
          transaction: mined,
        });
      } catch (error: any) {
        console.log("ContractToken.mint err", error);
        _reject({
          transaction: null,
          message:
            typeof error === "string" ? String(error) : error?.data?.message,
        });
      }
    });
  }

  private _initContractData() {
    const contractData = localStorage.getItem("contract");
    if (contractData) {
      const parsedContract: SavedContract = JSON.parse(contractData);
      this.contractData = parsedContract;
    }
  }
}
