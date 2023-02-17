import { useContext } from "react";
import { SubsocialContext } from "../../subsocial/provider";
import { SubsocialService } from "../../services";

export const useSpaceProfile = (spaceId: number) => {
  const { api, selectedAccount, network, isReady, getNetworkName } =
    useContext(SubsocialContext);

  const addFollowerToSpace = async (address?: string) => {
    if (!api || !selectedAccount?.address) {
      return;
    }
    const substrateApi = await api.blockchain.api;
    const tx = substrateApi.tx.spaceFollows.followSpace(spaceId);
    SubsocialService.signAndSendTx(tx, address ?? selectedAccount.address);
  };

  return {
    addFollowers: addFollowerToSpace,
  };
};
