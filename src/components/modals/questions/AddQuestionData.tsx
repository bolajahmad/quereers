import { Box, Button, Flex, ModalFooter, Text } from "@chakra-ui/react";
import { ISpace } from "../../../models/response";
import { SearchInput } from "../../forms";

interface Props {
  spaces: ISpace[];
  handleClose: () => void;
}

export const AddQuestionData: React.FC<Props> = ({ spaces, handleClose }) => {
  return (
    <Box>
      <Flex direction="column" gap="4">
        <Box>
          <Text fontWeight="bold" mt="3">
            Edit Spaces
          </Text>

          <Text mt="3">Make sure this question belongs to the right space</Text>

          <SearchInput
            listFooter={null}
            handleChange={(query) => console.log({ query })}
            onItemClick={(space) => console.log({ space })}
            searchData={spaces!}
          />
        </Box>
        <Box>
          <Text fontWeight="bold" mt="3">
            Edit Tags
          </Text>

          <Text mt="3">Select Appropriate tags to descibe your question</Text>

          <SearchInput
            listFooter={null}
            handleChange={(query) => console.log({ query })}
            onItemClick={(space) => console.log({ space })}
            searchData={spaces!}
          />
        </Box>

        <ModalFooter mt="8">
          <Button variant="ghost" mr={3} onClick={() => handleClose()}>
            Cancel
          </Button>

          <Button colorScheme="blue">Done</Button>
        </ModalFooter>
      </Flex>
    </Box>
  );
};
