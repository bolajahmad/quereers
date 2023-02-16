import { useToast } from "@chakra-ui/react";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useCallback, useContext, useEffect, useState } from "react";
import { CreateSpaceRequest } from "../../models/request";
import { ISpace } from "../../models/response";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";
import { Web3Storage } from "web3.storage";
import { Web3StorageApiKey } from "../constants";
import { createFileFromJSON } from "../helpers";
import { hexToString } from "@polkadot/util";
import { flattenSpaceStructs } from "@subsocial/api/subsocial/flatteners";

export const useSpacesData = () => {
  const toast = useToast();
  const [spaces, setSpaces] = useState<ISpace[] | null>(null);
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
          // console.log({ content: hexToString(JSON.stringify(content)) });
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
      setSpaces(spaces ?? []);
    }
  }, [api, selectedAccount]);

  // Creating a space on Subsocial network.
  const createSpace = async (model: CreateSpaceRequest) => {
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
    let image = "";
    if (model.image) {
      image = await api?.ipfs.saveFile(model.image as File);
    }
    console.log({ image });

    const data = {
      about: model.description,
      image: "",
      name: model.name,
      creator: selectedAccount.address,
    };
    const cid = await api?.ipfs.saveContent(data);
    console.log({ cid });
    const substrateApi = await api!.blockchain.api;

    const spaceTransaction = substrateApi.tx.spaces.createSpace(
      IpfsContent(cid),
      null // Permissions config (optional)
    );

    await SubsocialService.signAndSendTx(
      spaceTransaction,
      selectedAccount.address
    );
    toast({
      status: "info",
      title: "API response added in browser console logs.",
    });
  };

  const findSpaceFollowers = async (spaceId: string) => {
    const substrateApi = await api?.blockchain.api;
    const spaceFollowers =
      await substrateApi?.query.spaceFollows.spaceFollowers(spaceId);
    return spaceFollowers?.toHuman();
  };

  useEffect(() => {
    fetchSpacesByAddress();
  }, [fetchSpacesByAddress]);

  return {
    spaces,
    createSpace,
    findSpaceFollowers,
  };
};
