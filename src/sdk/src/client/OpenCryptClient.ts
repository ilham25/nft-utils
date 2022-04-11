import { ethers } from "ethers";
import { AuthClient } from "..";
import { ContractClient } from "../contract";
import { OpenCryptClientOptions } from "./lib/types";

export default class OpenCryptClient {
  auth: AuthClient;
  contract: ContractClient;
  protected url: string;

  constructor(options?: OpenCryptClientOptions) {
    this.url = "http://localhost:4000";
    this.auth = this._initAuth();
    this.contract = this._initContract();
  }

  private _initContract() {
    return new ContractClient(this.url);
  }

  private _initAuth() {
    return new AuthClient();
  }
}
