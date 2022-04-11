import { ethers } from "ethers";
import {
  ChangeFeatureStatusResponse,
  ContractAbi,
  ContractFeature,
  DeployedContract,
  SavedContract,
} from "./lib/types";

export default class ContractFeatures {
  protected provider: ethers.providers.Web3Provider;
  protected contractData: SavedContract;

  protected featureSetterName: { [key: string]: string } = {
    mintable: "setMintAccess",
  };

  protected featureGetterName: { [key: string]: string } = {
    mintable: "getMintAccess",
  };

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this._initContractData();
  }

  async disable(
    feature: ContractFeature
  ): Promise<ChangeFeatureStatusResponse> {
    return new Promise(async (resolve, _reject) => {
      try {
        const signer = this.provider.getSigner();
        const contract = new ethers.Contract(
          this.contractData.address,
          this.contractData.abi,
          signer
        );

        const disabling: ethers.ContractTransaction = await contract[
          this.featureSetterName[feature]
        ](false);
        const waiting: ethers.ContractReceipt = await disabling.wait();

        resolve({
          feature,
          message: "success enabling feature",
          status: false,
          transaction: waiting,
        });
      } catch (error: any) {
        console.log("ContractFeatures.disable err", error);
        _reject({
          feature,
          message:
            typeof error === "string" ? String(error) : error?.data?.message,
        });
      }
    });
  }
  enable(feature: ContractFeature): Promise<ChangeFeatureStatusResponse> {
    return new Promise(async (resolve, _reject) => {
      try {
        const signer = this.provider.getSigner();
        const contract = new ethers.Contract(
          this.contractData.address,
          this.contractData.abi,
          signer
        );

        const enabling: ethers.ContractTransaction = await contract[
          this.featureSetterName[feature]
        ](true);
        const waiting: ethers.ContractReceipt = await enabling.wait();

        resolve({
          feature,
          message: "success enabling feature",
          status: true,
          transaction: waiting,
        });
      } catch (error: any) {
        console.log("ContractFeatures.enable err", error);
        _reject({
          feature,
          message:
            typeof error === "string" ? String(error) : error?.data?.message,
        });
      }
    });
  }

  status(feature: ContractFeature): Promise<ChangeFeatureStatusResponse> {
    return new Promise(async (resolve, _reject) => {
      try {
        const signer = this.provider.getSigner();
        const contract = new ethers.Contract(
          this.contractData.address,
          this.contractData.abi,
          signer
        );

        const status = await contract[this.featureGetterName[feature]]();

        resolve({ feature, status });
      } catch (error: any) {
        console.log("ContractFeatures.status err", error);
        _reject({
          feature,
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
