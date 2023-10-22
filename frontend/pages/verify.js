import Head from "next/head";
import { contractAddresses, abi } from "../constants"
import Header from "../components/Header";
import { useMoralis, useWeb3Contract  } from "react-moralis";
import {useState,useEffect} from 'react';
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import { useRouter } from 'next/router';

import {
  SismoConnectButton, 
  SismoConnectConfig, 
  AuthType, 
  ClaimType,
} from "@sismo-core/sismo-connect-react";


const supportedChains = ["5"];
SismoConnectConfig = {
  appId: "0xc817321dbc144e7c79fbf1b00bea2147",
};
export default function Verify() {
  const {Moralis, isWeb3Enabled,chainId: chainIdHex,account } = useMoralis();
  const [responseBytes, setResponseBytes] = useState("");
const chainId = parseInt(chainIdHex)
const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
const dispatch = useNotification()
const handleNewNotification = () => {
  dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
  })
}
const router = useRouter();
useEffect(() => {
  if (responseBytes) {
    const { param1 } = router.query;

    if (param1) {
      const youtubeURL = `https://www.youtube.com/watch?v=${paramValue}`;
      window.location.href = youtubeURL;
    }
  }
}, [responseBytes, router.query.paramValue]);
  return (
    <div>
      <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="flex flex-row">
<SismoConnectButton
              config={SismoConnectConfig}
              auth={{authType: AuthType.GITHUB}}
              claim={{ 
                groupId: "0x97bfe9ec07b8bfbe87079d6ce117ec7e", 
                value: 2, 
                claimType: ClaimType.GTE
               }}   
              signature={{message: "Sign this message (Your identity will remain anonymous.)"}}
              onResponseBytes={(responseBytes) => {
                setResponseBytes(responseBytes);
              }}
              text={"Verify your Credentials.."}
            />
            </div>
          ) : (
            <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </div>
      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>
  );
}
