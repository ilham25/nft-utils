import { ethers } from "ethers";

type ContractAbiInputs = {
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
};
export type ContractAbi = {
  anonymous?: boolean;
  inputs: ContractAbiInputs[];
  stateMutability: string;
  type: string;
};
export interface CompiledContract {
  name: string;
  abi: ContractAbi[];
  bytecode: string;
}

export interface DeployedContract extends CompiledContract {
  address: string;
}

export type ContractFeature = "mintable" | "burnable";

export type CreateContractOption = {
  name: string;
  features?: ContractFeature[];
};

export type CreateContractResponse = {
  message: string;
  contract?: DeployedContract;
};

export type GetCompiledContractResponse = {
  message: string;
  contract?: CompiledContract;
};

export interface SavedContract extends Omit<DeployedContract, "bytecode"> {}

export type ChangeFeatureStatusResponse = {
  message?: string;
  feature: ContractFeature;
  status?: boolean;
  transaction?: ethers.ContractReceipt;
};

export type MintTokenOption = {
  address: string;
};

export type MintTokenResponse = {
  transaction: ethers.ContractReceipt | null | undefined;
};
