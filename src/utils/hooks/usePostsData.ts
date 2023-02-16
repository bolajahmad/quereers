import { useToast } from "@chakra-ui/react";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useCallback, useContext, useEffect, useState } from "react";
import { CreatePostModel } from "../../models/request";
import { PostModel } from "../../models/response";
import { SubsocialService } from "../../services";
import { SubsocialContext } from "../../subsocial/provider";
import { useSpacesData } from "./useSpacesData";

export const usePostsData = () => {
  const toast = useToast();
  const { api, selectedAccount: account } = useContext(SubsocialContext);
  const { spaces } = useSpacesData();
  const [posts, setPosts] = useState<PostModel[]>([]);

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
    console.log({ account });
    await SubsocialService.signAndSendTx(tx, account.address);
  };

  const fetchPosts = useCallback(async () => {
    if (!spaces || !api) {
      toast({
        title: "Space(s) not found",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const postIdsBySpacePromise = await Promise.all(
      spaces.map(async ({ id }) => {
        return api.blockchain.postIdsBySpaceId(id.toString());
      })
    );

    const postsById = await Promise.all(
      postIdsBySpacePromise.map((postIds) => {
        return api.base.findPosts({ ids: postIds });
      })
    );
    console.log({ postsById: postsById });
    let allPosts: PostModel[] = [];
    postsById.forEach((data) => {
      allPosts = [
        ...allPosts,
        ...data.map(({ content, struct }) => {
          return {
            id: struct.id.toNumber(),
            spaceId: struct.spaceId.toString(),
            title: content?.title ?? "N/A",
            owner: struct.owner.toString(),
            contentCID: struct.content.isIpfs.toString(),
            upvotes: struct.upvotesCount.toNumber(),
            downvotes: struct.downvotesCount.toNumber(),
            blockCreated: struct.created.block.toNumber(),
            createdAt: struct.created.time.toNumber() / 1000,
            description: content?.body ?? "",
            image: content?.image,
            tags: content?.tags,
          };
        }),
      ];
    });
    setPosts(allPosts.flat(1));
  }, [api, spaces, toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    createPost,
    allPosts: posts,
  };
};
