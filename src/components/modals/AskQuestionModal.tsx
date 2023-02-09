import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Text,
  ModalOverlay,
  Textarea,
  useDisclosure,
  Flex,
  List,
  ListItem,
  Circle,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { useSpacesData } from "../../utils/hooks";
import { ISpace } from "../../models/response";

const ViewQuestionsTags: React.FC<ISpace> = ({ id, title }) => {
  const { findSpaceFollowers } = useSpacesData();
  const [followersCount, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await findSpaceFollowers(id.toString());
      console.log({ data });
    }
    fetchData();
  }, [id, findSpaceFollowers]);

  return (
    <ListItem px="3">
      <Flex gap="4">
        <Circle bg="bisque" size={12} />
        <Flex
          flex="1"
          direction="column"
          gap="2"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Text fontWeight="bolder">Space 1</Text>
          <Text>10 Members</Text>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export const AskQuestionModal = () => {
  const { spaces } = useSpacesData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState();

  const saveQuestion = () => {
    if (!question) {
      console.log("No question asked!");
      return;
    }
    setStep(2);
  };

  return (
    <React.Fragment>
      <Button
        flex="1"
        gap="4"
        borderRadius="20px"
        _hover={{ bg: "#F5F5F5" }}
        onClick={onOpen}
        variant="flex_plain"
      >
        <RiQuestionnaireLine />
        Ask
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt="8">
            <Box>
              <Heading as="h2" textAlign="center">
                Write your Question
              </Heading>

              {step === 1 ? (
                <Box mt="6">
                  <Textarea
                    value={question}
                    name="question"
                    onChange={({ target }) => setQuestion(target.value)}
                    border="none"
                    disabled={question.length >= 1000}
                    placeholder="Write your question here"
                    borderBottom="1px solid gray.800"
                  />
                </Box>
              ) : null}

              {step === 2 && (
                <Box>
                  <Text fontWeight="bold" mt="3">
                    Edit Spaces
                  </Text>

                  <Text mt="3">
                    Make sure this question belong to the right space
                  </Text>
                  <Text fontWeight="extrabold" mt="3">
                    {question}
                  </Text>

                  <Box
                    position="relative"
                    border="1px solid #707070"
                    borderRadius="4px"
                  >
                    <Flex
                      alignItems="center"
                      gap="2"
                      px="3"
                      justifyContent="flex-start"
                    >
                      <FiSearch size={24} />

                      <Input
                        type="search"
                        value={query}
                        border="none"
                        flex="1"
                        w="full"
                        _focus={{
                          border: "none",
                          outline: "none",
                        }}
                        _focusVisible={{
                          boxShadow: "none",
                        }}
                        outline="none"
                        onChange={({ target }) => setQuery(target.value)}
                      />
                    </Flex>

                    {query.length ? (
                      <Box
                        position="absolute"
                        overflow="auto"
                        minHeight="fit-content"
                        zIndex={1}
                        py="4"
                        background="white"
                        border="1px solid #070707"
                        maxH="20em"
                        borderRadius={4}
                        left="0"
                        right="0"
                      >
                        <List>
                          {spaces?.map((space) => (
                            <ViewQuestionsTags key={space.id} {...space} />
                          ))}

                          <ListItem px="3" mt="4">
                            <Text>
                              Can't find <strong>{query}</strong>?
                            </Text>

                            <Button
                              variant="outline"
                              borderColor="currentColor"
                              borderRadius={10}
                              color="blue"
                              mt="2"
                            >
                              <IoAdd size={14} />
                              Create Space
                            </Button>
                          </ListItem>
                        </List>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              )}
            </Box>
          </ModalBody>

          <ModalFooter mt="8">
            <Button
              variant="ghost"
              mr={3}
              onClick={() => (step === 1 ? onClose() : setStep(1))}
            >
              Cancel
            </Button>
            {step === 1 && (
              <Button onClick={() => saveQuestion()} colorScheme="blue">
                Ask Question
              </Button>
            )}
            {step === 2 && <Button colorScheme="blue">Done</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
