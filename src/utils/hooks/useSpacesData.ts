import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { RawSpaceData } from "@subsocial/api/types";
import { useCallback, useContext, useEffect, useState } from "react";
import { ISpace } from "../../models/response";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";

export const useSpacesData = () => {
  const [spaces, setSpaces] = useState<RawSpaceData[] | null>(null);
  const { api, selectedAccount, network, isReady, getNetworkName } =
    useContext(SubsocialContext);

  const fetchSpacesByAddress = useCallback(async () => {
    if (api && selectedAccount) {
      // Fetching ids of all the spaces by owner.
      const spaceIds = await api.blockchain.spaceIdsByOwner(
        selectedAccount.address
      );

      // Fetching space data from all ids.
      const spacesData = await api.base.findSpaces({ ids: spaceIds });
      console.log({ spacesData });

      const spaces: ISpace[] = Array.from(spacesData).map(
        ({ content, struct }) => {
          console.log({
            id: struct.id.toNumber(),
            title: content?.name ?? "N/A",
            description: content?.about ?? "N/A",
          });
          return {
            id: struct.id.toNumber(),
            title: content?.name ?? "N/A",
            description: content?.about ?? "N/A",
            blockCreated: struct.created.block.toNumber(),
            created: struct.created.time.toNumber(),
            owner: struct.owner.toString(),
            tags: content?.tags ?? [],
            contentCID: struct.content.asIpfs.toString(),
            image: content?.image,
            isHidden: struct.hidden as any as boolean,
            isEdited: struct.edited as any as boolean,
          };
        }
      );
      console.log({ spaces });
      setSpaces(spacesData);
    }
  }, [api, selectedAccount]);

  // Creating a space on Subsocial network.
  const createSpace = async () => {
    // Always assure, the [api] is not null using [isReady] property.
    if (!isReady) {
      console.log({ message: "Unable to connect to the API." });
      return;
    }

    if (!selectedAccount) {
      console.log({ message: "There is connected account." });
      return;
    }

    if (getNetworkName(network) === "Mainnet") {
      console.log({
        message: "You need to use your own IPFS endpoint to store data.",
      });
      return;
    }

    // To change the IPFS either pass [CustomNetwork] or call [setupCrustIPFS] with
    // your mnemonic (MAKE SURE TO HIDE MNEOMIC BEFORE UPLOADING TO PUBLIC NETWORK).
    const cid = await api!.ipfs.saveContent({
      about:
        "A subsocial space for debugging and solving Javascript (and maybe Typescript) errors.",
      image: null,
      name: "Javascript Ninjas",
      tags: ["typescript", "javascript", "debugging"],
    });
    console.log({ cid });
    const substrateApi = await api!.blockchain.api;

    const spaceTransaction = substrateApi.tx.spaces.createSpace(
      IpfsContent(cid),
      null // Permissions config (optional)
    );
    console.log({ spaceTransaction });

    await SubsocialService.signAndSendTx(
      spaceTransaction,
      selectedAccount.address
    );
    alert("API response added in browser console logs.");
  };

  useEffect(() => {
    fetchSpacesByAddress();
  }, [fetchSpacesByAddress]);

  return {
    spaces,
    createSpace,
  };
};
