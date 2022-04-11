import { ethers } from "ethers";
import openCrypt from "./lib/client";

function App() {
  const login = async () => {
    try {
      const address = await openCrypt.auth.login();
    } catch (error: any) {
      console.log("err", String(error.message));
    }
  };

  const createSmartContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const createContract = await openCrypt.contract.create({
        name: "ContohContract",
      });

      console.log(createContract, "createContract");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={createSmartContract}>Create smart contract</button>
    </div>
  );
}

export default App;
