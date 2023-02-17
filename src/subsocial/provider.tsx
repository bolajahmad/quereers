import React, { createContext, useState, useCallback, useEffect } from "react";

import { SubsocialApi } from "@subsocial/api";
import { generateCrustAuthToken } from "@subsocial/api/utils/ipfs";

import {
  CRUST_TEST_AUTH_KEY,
  CustomNetwork,
  Localnet,
  Mainnet,
  Testnet,
} from "./config";
import { waitReady } from "@polkadot/wasm-crypto";
import { Buffer } from "buffer";
import { useGetAccount } from "../utils/hooks";
import { NetworkType, UserAccount } from "../models/shared";

// @ts-ignore
window.Buffer = Buffer;

const SUBSOCIAL_NETWORK_NAME_KEY = "SUBSOCIAL_NETWORK_NAME_KEY";

interface Props {
  children: React.ReactNode;
  defaultNetwork?: CustomNetwork;
}

interface SubsocialContextInterface {
  api: SubsocialApi | null;
  isReady: boolean;
  initialize: () => void;
  network: CustomNetwork;
  isInitializing: boolean;
  changeNetwork: (network: CustomNetwork) => void;
  setupCrustIPFS: (mneomic: string) => void;
  accounts: UserAccount[] | null;
  updateSelectedAccount: (address?: string) => void;
  getNetworkName: (network: CustomNetwork) => NetworkType;
  selectedAccount?: UserAccount;
}

const setStoredNetwork = (network: CustomNetwork) => {
  let networkName: string;
  switch (network) {
    case Testnet:
      networkName = "testnet";
      break;
    case Mainnet:
      networkName = "mainnet";
      break;
    case Localnet:
      networkName = "localnet";
      break;
    default:
      networkName = "testnet";
      break;
  }
  localStorage.setItem(SUBSOCIAL_NETWORK_NAME_KEY, networkName);
};

const getStoredNetwork = () => {
  const networkName = localStorage.getItem(SUBSOCIAL_NETWORK_NAME_KEY);
  switch (networkName) {
    case "testnet":
      return Testnet;
    case "mainnet":
      return Mainnet;
    case "localnet":
      return Localnet;
    default:
      return Testnet;
  }
};

export const SubsocialContext = createContext({
  api: null,
  isReady: false,
  initialize: () => {},
  network: getStoredNetwork(),
  changeNetwork: () => {},
  isInitializing: false,
  setupCrustIPFS: () => {},
  accounts: null,
  getNetworkName: () => "Testnet",
  updateSelectedAccount: () => {},
} as SubsocialContextInterface);

export const SubsocialContextProvider = ({
  children,
  defaultNetwork,
}: Props) => {
  const [isInitializing, setInitializing] = useState(false);
  const [isReady, setisReady] = useState(false);
  const [api, setApi] = useState<SubsocialApi | null>(null);
  const [network, setNetwork] = useState<CustomNetwork>(
    defaultNetwork ?? getStoredNetwork()
  );
  const { account, accounts, updateSelectedAccount, getNetworkName } =
    useGetAccount();

  const initialize = useCallback(async () => {
    setInitializing(true);
    await waitReady();
    const newApi = await SubsocialApi.create(network);

    setApi(newApi);
    setisReady(true);

    // For testnet using CRUST IPFS test Mnemonic.
    if (network === Testnet) {
      // Use this ipfs object, to set authHeader for writing on Crust IPFS cluster.
      newApi.ipfs.setWriteHeaders({
        authorization: "Basic " + CRUST_TEST_AUTH_KEY,
      });
    }
    setInitializing(false);
  }, [network]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const changeNetwork = (customNetwork: CustomNetwork) => {
    setNetwork(customNetwork);
    setStoredNetwork(customNetwork);
    if (window != null) {
      window.location.reload();
    }
  };

  const setupCrustIPFS = async (mnemonic: string) => {
    if (!isReady || api === null) throw Error("API is not ready yet.");

    const authHeader = generateCrustAuthToken(mnemonic);
    // Use this ipfs object, to set authHeader for writing on Crust IPFS cluster.
    api.ipfs.setWriteHeaders({
      authorization: "Basic " + authHeader,
    });
  };

  return (
    <SubsocialContext.Provider
      value={{
        isReady,
        api,
        initialize,
        isInitializing,
        network,
        selectedAccount: account,
        accounts,
        updateSelectedAccount,
        getNetworkName,
        changeNetwork,
        setupCrustIPFS,
      }}
    >
      {children}
    </SubsocialContext.Provider>
  );
};
