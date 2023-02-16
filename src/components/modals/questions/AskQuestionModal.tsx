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
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import React, { useCallback, useContext, useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { CreatePostModel } from "../../../models/request";
import { SubsocialService } from "../../../services";
import { SubsocialContext } from "../../../subsocial/provider";
import { useGetAccount, useSpacesData } from "../../../utils/hooks";
import { AddQuestionData } from "./AddQuestionData";
import { QuestionForm } from "./QuestionForm";

export const AskQuestionModal = () => {
  const { spaces } = useSpacesData();
  const [questionData, setQuestionData] = useState<
    Partial<Omit<CreatePostModel, "image">> & { image?: string }
  >();
  const { api, selectedAccount: account } = useContext(SubsocialContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);

  const combinePostAndSubmit = useCallback(
    async (data: Partial<CreatePostModel>) => {
      console.log({ data });
      let image = "";
      if (data.image) {
        image = await api?.ipfs.saveFile(data.image);
      }
      setQuestionData({
        title: data.title,
        question: data.question,
        image,
      });
      setStep(2);
    },
    [api]
  );

  const submitQuestion = async (data: any) => {
    console.log({ data });
    if (!data?.spaces) {
      console.log("Space not found");
      return;
    }

    const model = {
      title: data?.title,
      body: data?.question,
    };
    console.log("loading");
    if (data?.tags && data?.tags.length) {
      (model as any)["tags"] = data.tags;
    }
    if (data?.image && data.image.length) {
      (model as any)["image"] = data.image;
    }
    console.log({ model });

    const cid = await api!.ipfs.saveContent(model);
    console.log({ cid });
    const substrateApi = await api!.blockchain.api;

    const space =
      typeof data.spaces === "number" ? data.spaces : data.spaces[0];

    const tx = substrateApi.tx.posts.createPost(
      space,
      { RegularPost: null },
      IpfsContent(cid)
    );
    SubsocialService.signAndSendTx(tx, `${account?.address}`);
  };

  console.log({ questionData });

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
                  onFormSubmit={(model) => combinePostAndSubmit(model)}
                />
              ) : null}

              {step === 2 && (
                <AddQuestionData
                  handleClose={() => setStep(1)}
                  spaces={spaces!}
                  handleComplete={(model) =>
                    submitQuestion({ ...questionData, ...model })
                  }
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
