import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { CreateCommentRequest, ViewCommentModel } from "../../models/request";
import { PostModel } from "../../models/response";
import { usePostCommentData } from "../../utils/hooks";

interface ComponentProps {
  post: PostModel;
  withParentPost?: number;
}

type CommentProps = ViewCommentModel & { withparentPost: string };

export const ViewPostCommentWidget: React.FC<CommentProps> = ({
  id,
  owner,
  comment,
  upvotesCount,
  downvotesCount,
  createdAt,
}) => {
  const [reply, setReply] = useState("");
  const [isReplying, setReplying] = useState("");
  const dateCreated = [
    new Date(createdAt).getFullYear(),
    new Date(createdAt).getMonth() + 1,
  ];
  return (
    <Flex paddingY="6" pl="4">
      <Circle size={10} bg="gray.500" />

      <Box flex="1">
        <Heading
          as="h4"
          display="flex"
          alignItems="center"
          gap="2"
          fontSize="md"
          justifyContent="flex-start"
        >
          {owner.substring(0, 7)} &bull;
          <Text fontWeight="normal" fontSize="sm">
            {dateCreated[1]} {dateCreated[0]}
          </Text>{" "}
        </Heading>

        <Text mt="4">{comment}</Text>

        {isReplying === id ? (
          <Flex pl="8" gap="4">
            <Input
              type="text"
              borderRadius={12}
              bg="white"
              flex="1"
              w="full"
              value={reply}
              onChange={({ target }) => setReply(target.value)}
              color="black"
              placeholder="Add a comment..."
            />
            <Button colorScheme="blue" borderRadius="6">
              Add Reply
            </Button>
          </Flex>
        ) : (
          <Flex gap="2" mt="4">
            <Button variant="ghost" borderRadius="6">
              <AiFillLike /> {upvotesCount}
            </Button>
            <Button variant="ghost" borderRadius="6">
              <AiFillDislike /> {downvotesCount}
            </Button>
            <Button
              variant="ghost"
              borderRadius="6"
              onClick={() => setReplying(id)}
            >
              Reply
            </Button>

            <Button ml="auto" variant="ghost" borderRadius="6">
              <SlOptions />
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export const PostCommentsSection: React.FC<ComponentProps> = ({
  post,
  withParentPost,
}) => {
  const [comments, setComments] = useState<ViewCommentModel[]>([]);
  const { addAnswerToPost, fetchCommentsOfParentPost } = usePostCommentData();
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

  useEffect(() => {
    async function handleLoad() {
      const comments = await fetchCommentsOfParentPost(`${post.id}`);
      setComments(comments);
    }
    handleLoad();
  }, [fetchCommentsOfParentPost, post.id]);
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

      <Flex>
        {comments.map((comment) => {
          return (
            <Box key={comment.id}>
              <ViewPostCommentWidget
                withparentPost={post.id.toString()}
                {...comment}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
