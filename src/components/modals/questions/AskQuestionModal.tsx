import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { usePostsData, useSpacesData } from "../../../utils/hooks";
import { AddQuestionData } from "./AddQuestionData";
import { QuestionForm } from "./QuestionForm";

export const AskQuestionModal = () => {
  const { spaces } = useSpacesData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState("");
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState<string[]>();
  const { combinePostAndSubmit } = usePostsData();

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
                <QuestionForm
                  handleClose={() => onClose()}
                  onFormSubmit={() => saveQuestion()}
                />
              ) : null}

              {step === 2 && (
                <AddQuestionData
                  handleClose={() => setStep(1)}
                  spaces={spaces!}
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
