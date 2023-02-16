import { Box, Button, Circle, Flex, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { CreateCommentRequest } from "../../models/request";
import { PostModel } from "../../models/response";
import { usePostCommentData } from "../../utils/hooks";

interface ComponentProps {
  post: PostModel;
  withParentPost?: number;
}

export const PostCommentsSection: React.FC<ComponentProps> = ({
  post,
  withParentPost,
}) => {
  const { addAnswerToPost } = usePostCommentData();
  const toast = useToast();
  const [comment, setComment] = useState("");
  const postComment = async () => {
    if (!comment || comment.length < 10) {
      toast({
        status: "info",
        duration: 3000,
        description: "You have entered an invalid answer!",
        title: "Form error",
      });
      return;
    }
    const model: CreateCommentRequest = {
      comment,
      // image,
      rootPostID: post.id,
      parentPostID: withParentPost ?? null,
    };
    await addAnswerToPost(model);
  };
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" gap="2">
        <Circle size={12} bg="gray.300" />

        <Input
          type="text"
          borderRadius={12}
          bg="white"
          flex="1"
          w="full"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          color="black"
          placeholder="Add a comment..."
        />
        <Button colorScheme="blue" onClick={() => postComment()}>
          Add Answer
        </Button>
      </Flex>
    </Box>
  );
};
