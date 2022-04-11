import { ethers } from "ethers";

export default class AuthClient {
  protected provider: ethers.providers.Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async login(): Promise<string> {
    return new Promise(async (resolve, _reject) => {
      try {
        await this.provider.send("eth_requestAccounts", []);
        const signer = this.provider.getSigner();

        const address = await signer.getAddress();

        resolve(address);
      } catch (error) {
        console.log("AuthClient.login err", error);
      }
    });
  }
}
