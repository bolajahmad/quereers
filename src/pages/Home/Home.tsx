import { Box, Flex } from "@chakra-ui/react";
import { AskQuestionWisget, ViewQuestionWidget } from "../../components/misc";

export const LandingPage = () => {
  return (
    <Box py="10">
      <Flex direction="column" gap="4" alignItems="stretch">
        <AskQuestionWisget />

        <ViewQuestionWidget />
      </Flex>
    </Box>
  );
};
