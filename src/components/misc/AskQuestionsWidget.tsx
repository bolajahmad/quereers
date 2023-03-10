import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  SkeletonCircle,
} from "@chakra-ui/react";
import { RiEditBoxLine } from "react-icons/ri";
import { AskQuestionModal } from "../modals";

export const AskQuestionWisget = () => {
  return (
    <Box bg="white" py="3" px="4" border="1px solid #E0E0E0" borderRadius="4px">
      <Flex gap="4" alignItems="center">
        <SkeletonCircle size="14" />

        <Box flex="1">
          <Input
            type="button"
            borderRadius="20px"
            value="What do you want to ask?"
            color="white.7"
            placeholder="What do you want to ask?"
            textAlign="left"
            fontWeight="bold"
          />
        </Box>
      </Flex>

      <Flex alignItems="center" mt="6">
        <AskQuestionModal />

        <Divider orientation="vertical" colorScheme="gray" size="6" />

        <Button
          flex="1"
          borderRadius="20px"
          _hover={{ bg: "#F5F5F5" }}
          variant="flex_plain"
          gap="4"
        >
          <RiEditBoxLine />
          Answer
        </Button>
      </Flex>
    </Box>
  );
};
