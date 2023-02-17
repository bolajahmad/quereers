import {
  Box,
  Button,
  Flex,
  ModalFooter,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { capitalize, lowerCase } from "lodash";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { ISpace } from "../../../models/response";
import { SearchInput } from "../../forms";
import { CreateSpaceModal } from "../spaces";

interface Props {
  spaces: ISpace[];
  handleClose: () => void;
  handleComplete: (model: any) => void;
}

type ValueID = { id: number; value: string };

export const AddQuestionData: React.FC<Props> = ({
  spaces,
  handleComplete,
  handleClose,
}) => {
  const [filteredSpaces, setSpaces] = useState(spaces);
  const [tags, setTags] = useState<ValueID[]>([]);
  const [selectedSpaces, setSelectedSpaces] = useState<ValueID[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<ValueID[] | null>(null);
  const filterSpaces = (word: string) => {
    const newSpaces = spaces
      ? spaces.filter(({ title }) => lowerCase(title).includes(lowerCase(word)))
      : null;
    setSpaces(newSpaces ? newSpaces : []);
  };
  const filterTags = (word: string) => {
    if (spaces) {
      const tags = new Set(spaces.map(({ tags }) => tags).flat(1));
      console.log({ tags });
      const filtered = Array.from(tags)
        .filter((tag) => lowerCase(tag).includes(lowerCase(word)))
        .map((tag, index) => ({ id: index + 1, value: tag }));
      setTags(filtered);
    }
  };
  const createQuestion = async () => {
    const model = {
      tags: [] as string[],
      spaces: [] as number[],
    };
    if (selectedTags && selectedTags.length) {
      model.tags = selectedTags.map(({ value }) => {
        value = value
          .split(" ")
          .map((word) => lowerCase(word))
          .join(" ");
        return value;
      });
    }
    if (selectedSpaces && selectedSpaces.length) {
      model.spaces = selectedSpaces.map(({ id }) => id);
    }

    handleComplete(model);
  };

  console.log({ selectedSpaces, selectedTags });

  return (
    <Box>
      <Flex direction="column" gap="4">
        <Box>
          <Text fontWeight="bold" mt="3">
            Edit Spaces
          </Text>

          <Text mt="3">Make sure this question belongs to the right space</Text>
          <Wrap mt="2" mb="2">
            {selectedSpaces && selectedSpaces.length
              ? selectedSpaces?.map(({ id, value }) => (
                  <Tag
                    key={id}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>{capitalize(value)}</TagLabel>
                    <TagCloseButton
                      onClick={() =>
                        setSelectedSpaces((prev) =>
                          prev!.filter(({ id: is }) => is !== id)
                        )
                      }
                    />
                  </Tag>
                ))
              : null}
          </Wrap>
          <SearchInput
            listFooter={<CreateSpaceModal />}
            handleChange={filterSpaces}
            onItemClick={({ id, title }: any) => {
              const index = selectedSpaces?.findIndex(
                ({ id: is }) => is === id
              );
              if (index && index >= 0) {
                return;
              }

              setSelectedSpaces((prev) =>
                prev ? [...prev, { id, value: title }] : [{ id, value: title }]
              );
            }}
            searchData={filteredSpaces}
          />
        </Box>
        <Box>
          <Text fontWeight="bold" mt="3">
            Edit Tags
          </Text>

          <Text mt="3">Select Appropriate tags to descibe your question</Text>

          <Wrap my="2">
            {selectedTags && selectedTags.length
              ? selectedTags?.map(({ id, value }) => (
                  <Tag
                    key={id}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>{capitalize(value)}</TagLabel>
                    <TagCloseButton
                      onClick={() =>
                        setSelectedSpaces((prev) =>
                          prev!.filter(({ id: is }) => is !== id)
                        )
                      }
                    />
                  </Tag>
                ))
              : null}
          </Wrap>
          <SearchInput
            listFooter={
              <Button>
                <MdAddCircle size="18" />
                Create Tag
              </Button>
            }
            handleChange={filterTags}
            onItemClick={({ id, value }: any) => {
              const index = selectedTags?.findIndex(({ id: is }) => is === id);
              if (index && index >= 0) {
                return;
              }

              setSelectedTags((prev) =>
                prev ? [...prev, { id, value }] : [{ id, value }]
              );
            }}
            searchData={tags}
          />
        </Box>

        <ModalFooter mt="8">
          <Button variant="ghost" mr={3} onClick={() => handleClose()}>
            Cancel
          </Button>

          <Button colorScheme="blue" onClick={() => createQuestion()}>
            Done
          </Button>
        </ModalFooter>
      </Flex>
    </Box>
  );
};
