import { useToast } from "@chakra-ui/react";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useCallback, useContext, useEffect, useState } from "react";
import { CreateSpaceRequest } from "../../models/request";
import { ISpace } from "../../models/response";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";

export const useSpacesData = () => {
  const toast = useToast();
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [spaces, setSpaces] = useState<ISpace[] | null>(null);
  const { api, selectedAccount, network, isReady, getNetworkName } =
    useContext(SubsocialContext);

  const fetchSpacesByAddress = useCallback(async () => {
    if (api && selectedAccount) {
      setLoadingSpaces(true);
      // Fetching ids of all the spaces by owner.
      const spaceIds = await api.blockchain.spaceIdsByOwner(
        "5EUV2PvX8sC3DzrirBGAKv6cmFTKFs9VwRvRbrdJLRtw4kLt"
      );

      // Fetching space data from all ids.
      const spacesData = await api.base.findSpaces({ ids: spaceIds });

      const spaces: ISpace[] = Array.from(spacesData).map(
        ({ content, struct }) => {
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
      setLoadingSpaces(false);
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
      image,
      name: model.name,
      creator: selectedAccount.address,
    };
    const cid = await api?.ipfs.saveContent(data);
    const substrateApi = await api!.blockchain.api;

    const spaceTransaction = substrateApi.tx.spaces.createSpace(
      IpfsContent(cid),
      null // Permissions config (optional)
    );

    await SubsocialService.signAndSendTx(
      spaceTransaction,
      "5EUV2PvX8sC3DzrirBGAKv6cmFTKFs9VwRvRbrdJLRtw4kLt"
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
    loadingSpaces,
    findSpaceFollowers,
  };
};
