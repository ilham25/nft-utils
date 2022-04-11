import axios, { AxiosRequestConfig } from "axios";
import { ethers } from "ethers";
import {
  CreateContractOption,
  CreateContractResponse,
  DeployedContract,
  GetCompiledContractResponse,
} from "./lib/types";

export default class ContractClient {
  protected url: string;
  protected provider: ethers.providers.Web3Provider;

  constructor(url: string) {
    this.url = url;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async create(option: CreateContractOption): Promise<CreateContractResponse> {
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

        resolve({
          message: "Contract created!",
          contract,
        });
      } catch (error) {
        console.log("err", error);
      }
    });
  }
}
