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
export type CreateContractOption = {
  name: string;
};

export type CreateContractResponse = {
  message: string;
  contract?: DeployedContract;
};

export type GetCompiledContractResponse = {
  message: string;
  contract?: CompiledContract;
};
