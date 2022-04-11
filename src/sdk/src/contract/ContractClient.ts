import axios, { AxiosRequestConfig } from "axios";
import { ethers } from "ethers";
import ContractFeatures from "./ContractFeatures";
import ContractToken from "./ContractToken";
import {
  ContractFeature,
  CreateContractOption,
  CreateContractResponse,
  DeployedContract,
  GetCompiledContractResponse,
  ContractAbi,
  SavedContract,
} from "./lib/types";

export default class ContractClient {
  protected url: string;
  protected provider: ethers.providers.Web3Provider;
  protected contractData: SavedContract;

  features: ContractFeatures;
  token: ContractToken;

  constructor(url: string) {
    this.url = url;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    this.features = this._initFeatures();
    this.token = this._initToken();

    this._initContractData();
  }

  async create(option: CreateContractOption): Promise<CreateContractResponse> {
    let defaultFeatures: [ContractFeature] = ["mintable"];
    option.features = !option.features ? defaultFeatures : option.features;

    return new Promise(async (resolve, _reject) => {
      try {
        const query = option;
        const { data } = await axios.post<GetCompiledContractResponse>(
          `${this.url}/create`,
          query
        );
        const signer = this.provider.getSigner();
        const newContract = new ethers.ContractFactory(
          data.contract.abi,
          data.contract.bytecode,
          signer
        );
        const deployedContract = await newContract.deploy();
        await deployedContract.deployed();

        const contract: DeployedContract = {
          ...data.contract,
          address: deployedContract.address,
        };

        const savedContract: SavedContract = {
          abi: contract.abi,
          address: contract.address,
          name: contract.name,
        };

        localStorage.setItem("contract", JSON.stringify(savedContract));

        this.contractData = savedContract;
        this._refresh();

        resolve({
          message: "Contract created!",
          contract,
        });
      } catch (error) {
        console.log("err", error);
      }
    });
  }

  private _initFeatures() {
    return new ContractFeatures();
  }

  private _initToken() {
    return new ContractToken();
  }

  private _initContractData() {
    const contractData = localStorage.getItem("contract");
    if (contractData) {
      const parsedContract: SavedContract = JSON.parse(contractData);
      this.contractData = parsedContract;
    }
  }

  private _refresh() {
    this.features = this._initFeatures();
    this.token = this._initToken();
  }
}
