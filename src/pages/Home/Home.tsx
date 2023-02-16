import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { AskQuestionWisget, ViewQuestionWidget } from "../../components/misc";
import { usePostsData } from "../../utils/hooks";

export const LandingPage = () => {
  const { allPosts } = usePostsData();
  return (
    <Box py="10">
      <Flex direction="column" gap="4" alignItems="stretch">
        <AskQuestionWisget />

        <ViewQuestionWidget />
      </Flex>
    </Box>
  );
};
