import { useToast } from "@chakra-ui/react";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useContext } from "react";
import { CreatePostModel } from "../../models/shared";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";
import { useGetAccount } from "./subsocial";

export const usePostsData = () => {
  const toast = useToast();
  const { account } = useGetAccount();
  const { api } = useContext(SubsocialContext);

  const combinePostAndSubmit = (
    question: string,
    space: CreatePostModel["space"],
    tags: string[]
  ) => {
    // const
  };

  const createPost = async (post: CreatePostModel) => {
    if (!api || !account) {
      toast({
        title: "Post Create Failed",
        description: "You are not connected to the subsocial network",
        status: "error",
        duration: 3000,
      });
      return;
    }

    let imageCID = "";
    if (post.image) {
      imageCID = await api.ipfs.saveFile(post.image);
    }

    const cid = await api.ipfs.saveContent({
      title: post.title,
      image: imageCID,
      tags: post.tags,
      body: post.question,
    });
    const substrateApi = await api.blockchain.api;
    const tx = substrateApi.tx.posts.createPost(
      "1",
      { RegularPost: null },
      IpfsContent(cid)
    );
    await SubsocialService.signAndSendTx(tx, account.address);
  };

  return {
    createPost,
    combinePostAndSubmit,
  };
};
