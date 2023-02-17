import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { usePostsData } from "../../utils/hooks";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { PostCommentsSection } from "./PostsCommentSection";

export const ViewQuestionWidget: React.FC = () => {
  const { allPosts, loadingPosts } = usePostsData();
  const [isReplying, setReplying] = useState<string>();

  return (
    <>
      {allPosts.length ? (
        allPosts.map((post) => {
          const {
            id,
            spaceId,
            description,
            title,
            image,
            owner,
            upvotes,
            downvotes,
          } = post;

          return (
            <Box key={id}>
              <Box
                bg="white"
                py="3"
                px="4"
                border="1px solid #E0E0E0"
                borderRadius="4px"
              >
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  gap="3"
                >
                  <Circle bg="pink" size={14} />

                  <Box flex="1">
                    <Heading as="h4" fontSize="md">
                      {owner.substring(0, 9)}
                    </Heading>

                    <Text mt="3" noOfLines={2}>
                      {owner}
                    </Text>
                  </Box>
                </Flex>

                <Heading as="h2" mt="4" fontSize="lg">
                  {title}
                </Heading>

                <Text mt="3" noOfLines={2}>
                  {description}
                </Text>

                {/* {image ? <Box>
                
              </Box> : null} */}

                <Flex gap="2" mt="4">
                  <Button variant="ghost" borderRadius="6">
                    <AiFillLike /> {upvotes}
                  </Button>
                  <Button variant="ghost">
                    <AiFillDislike /> {downvotes}
                  </Button>
                  <Button
                    variant="ghost"
                    borderRadius="6"
                    bg={isReplying === id.toString() ? "gray.400" : ""}
                    onClick={() => setReplying(id.toString())}
                  >
                    <FiMessageCircle />
                  </Button>
                  <Button variant="ghost" borderRadius="6">
                    <BsShareFill />
                  </Button>

                  <Button ml="auto" variant="ghost" borderRadius="6">
                    <SlOptions />
                  </Button>
                </Flex>

                {isReplying && (
                  <Box mt="4">
                    <PostCommentsSection post={post} />
                  </Box>
                )}
              </Box>
            </Box>
          );
        })
      ) : (
        <Box color="red" textAlign="center">
          {loadingPosts ? (
            <Spinner />
          ) : (
            <Text fontWeight="bold">
              There are no questions. Be the first to ask.
            </Text>
          )}
        </Box>
      )}
    </>
  );
};
