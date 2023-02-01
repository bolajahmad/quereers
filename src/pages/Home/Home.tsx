import { Box, Flex } from "@chakra-ui/react";
import { AskQuestionWisget } from "../../components/misc";

export const LandingPage = () => {
  return (
    <Box py="10">
      <Flex direction="column" alignItems="stretch">
        <AskQuestionWisget />
      </Flex>
    </Box>
  );
};
