import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useContext } from "react";
import { CreateCommentRequest } from "../../models/request";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";

export const usePostCommentData = () => {
  const { selectedAccount, api } = useContext(SubsocialContext);
  const createComment = async ({
    comment,
    rootPostID,
    parentPostID,
    image,
  }: CreateCommentRequest) => {
    if (!api || !selectedAccount?.address) {
      return;
    }
    const data = {
      image: "",
      body: comment,
    };
    if (image) {
      data.image = await api.ipfs.saveFile(image);
    }

    const cid = await api.ipfs.saveContent(data);

    const substrateApi = await api.blockchain.api;
    const tx = substrateApi.tx.posts.createPost(
      rootPostID,
      { Comment: { parentId: parentPostID, rootPostId: rootPostID } },
      IpfsContent(cid)
    );
    await SubsocialService.signAndSendTx(tx, selectedAccount.address);
  };
  return {
    addAnswerToPost: createComment,
  };
};
