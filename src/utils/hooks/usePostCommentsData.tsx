import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { idToBn } from "@subsocial/utils";
import { useContext } from "react";
import { CreateCommentRequest, ViewCommentModel } from "../../models/request";
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
  const fetchCommentsOfParentPost = async (postId: string) => {
    const replyIds = await api!.blockchain.getReplyIdsByPostId(idToBn(postId));

    // For getting comments use posts functions
    const replies = await api!.findPublicPosts(replyIds);

    const formattedReplies: ViewCommentModel[] = replies.map(
      ({ content, struct, id }) => ({
        blockCreated: struct.createdAtBlock,
        id,
        comment: content?.body as string,
        contentId: struct.contentId ?? "",
        createdAt: struct.createdAtTime,
        owner: struct.createdByAccount,
        downvotesCount: struct.downvotesCount,
        upvotesCount: struct.upvotesCount,
        rootPostId: (struct as any).rootPostId,
        spaceId: struct.spaceId as string,
        isSharedPost: struct.isSharedPost,
      })
    );
    return formattedReplies;
  };
  return {
    addAnswerToPost: createComment,
    fetchCommentsOfParentPost,
  };
};
