import { ethers } from "ethers";
import { useState } from "react";
import openCrypt from "./lib/client";

function App() {
  const [contractName, setContractName] = useState<string>("");

  const login = async () => {
    try {
      const address = await openCrypt.auth.login();

      console.log(address);
    } catch (error: any) {
      console.log("err", String(error.message));
    }
  };

  const createSmartContract = async () => {
    try {
      const createContract = await openCrypt.contract.create({
        name: contractName,
        features: [],
      });

      console.log(createContract, "createContract");
    } catch (error) {
      console.log("err", error);
    }
  };

  const onContractNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setContractName(e.target.value);
  };

  const enableMint = async () => {
    try {
      const enable = await openCrypt.contract.features.enable("mintable");
      console.log(enable, "enable");
    } catch (error) {
      console.log("err", error);
    }
  };
  const disableMint = async () => {
    try {
      const disable = await openCrypt.contract.features.disable("mintable");
      console.log(disable, "disable");
    } catch (error) {
      console.log("err", error);
    }
  };
  const statusMint = async () => {
    try {
      const status = await openCrypt.contract.features.status("mintable");
      console.log(status, "status");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={createSmartContract}>Create smart contract</button>
      <input type="text" value={contractName} onChange={onContractNameChange} />

      <div>
        <button onClick={enableMint}>Enable mint</button>
        <button onClick={disableMint}>Disable mint</button>
        <button onClick={statusMint}>Mint status</button>
      </div>
    </div>
  );
}

export default App;
