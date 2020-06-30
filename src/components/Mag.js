import React, { useState, useEffect } from "react";
// import "./styles.css";
// import { content } from "./data/contract";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";

const { IconBuilder, IconAmount, IconConverter } = IconService;

const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});

export default function Mag() {
  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendICXAmount, setSendICXAmount] = useState(0);
  const [contractTxHash, setContractTxHash] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [txHash, setTxHash] = useState("");
  const [messageTxHash, setMessageTxHash] = useState("");
  const [massageDestinationAddress, setMassageDestinationAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    magic.user.isLoggedIn().then(async magicIsLoggedIn => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const publicAddress = await magic.icon.getAccount();
        setPublicAddress(publicAddress);
        setUserMetadata(await magic.user.getMetadata());
      }
    });
  }, [isLoggedIn]);

  const login = async () => {
    await magic.auth.loginWithMagicLink({ email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  const handlerSendTransaction = async () => {
    
    const metadata = await magic.user.getMetadata();

    const txObj = new IconBuilder.CallTransactionBuilder()
      .from(metadata.publicAddress)
      .to('cxccce3d3c2f999536499753535eba96a6a6b8344a')
      .value(IconAmount.of(2, IconAmount.Unit.ICX).toLoop())
      .stepLimit(IconConverter.toBigNumber(1000000))
      .nid(IconConverter.toBigNumber(3))
      .nonce(IconConverter.toBigNumber(1))
      .version(IconConverter.toBigNumber(3))
      .timestamp(new Date().getTime() * 1000)
      .method('take_action')
      .params({
        "action": "place_bet"
      })
      .build();
    console.log("called")
    const txhash = await magic.icon.sendTransaction(txObj);

    setTxHash(txhash);

    console.log("transaction result", txhash);
  };


  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="container">
          <h1>Please sign up or login</h1>
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Enter your email"
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
          <button onClick={login}>Send</button>
        </div>
      ) : (
        <div>
          <div className="container">
            <h1>Current user: {userMetadata.email}</h1>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="container">
            <h1>Icon address</h1>
            <div className="info">
              <a
                href={`https://bicon.tracker.solidwallet.io/address/${publicAddress}`}
                target="_blank"
              >
                {publicAddress}
              </a>
            </div>
          </div>
          <div className="container">
            <h1>Send Transaction</h1>
            {txHash ? (
              <div>
                <div>Send transaction success</div>
                <div className="info">
                  <a
                    href={`https://bicon.tracker.solidwallet.io/transaction/${txHash}`}
                    target="_blank"
                  >
                    {txHash}
                  </a>
                </div>
              </div>
            ) : (
              <div />
            )}
            <input
              type="text"
              name="destination"
              className="full-width"
              required="required"
              placeholder="Destination address"
              // onChange={event => {
              //   setDestinationAddress(event.target.value);
              // }}
            />
            <input
              type="text"
              name="amount"
              className="full-width"
              required="required"
              placeholder="Amount in ICX"
              // onChange={event => {
              //   setSendICXAmount(event.target.value);
              // }}
            />
            <button id="btn-send-txn" onClick={handlerSendTransaction}>
              Send Transaction
            </button>
          </div>
          
          {/* <div className="container">
            <h1>Smart Contract</h1>
            <div className="info">
              <a
                href={`https://bicon.tracker.solidwallet.io/transaction/${contractTxHash}`}
                target="_blank"
              >
                {contractTxHash}
              </a>
            </div>
            <button id="btn-deploy" onClick={handleDeployContract}>
              Deploy Contract
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
