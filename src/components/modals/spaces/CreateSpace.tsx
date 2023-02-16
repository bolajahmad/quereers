import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { useSpacesData } from "../../../utils/hooks";

export const CreateSpaceModal = () => {
  const { createSpace } = useSpacesData();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [uploadedImage, setUploadedImage] = useState<{
    name: string;
    src: string;
    size: number;
  }>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (model: any) => {
    console.log({ model });
    createSpace(model);
  };
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setUploadedImage(undefined);
      return;
    }

    const file = event.target.files[0];
    setValue("image", file);

    var reader = new FileReader();

    reader.onload = function (event) {
      setUploadedImage({
        name: file.name,
        src: event.target?.result as string,
        size: file.size,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button
        variant="plain_flex"
        color="white.7"
        bg="#F5F5F5"
        w="full"
        gap="4"
        _hover={{ bg: "#E0E0E0" }}
        onClick={() => onOpen()}
      >
        <MdAddCircle size={18} fill="#707070" />
        Create Space
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
              <Heading as="h2" textAlign="left">
                Create a Space
              </Heading>

              <Text mt="3">
                Share your interests, curate content, host discussions, and
                more.
              </Text>

              <Box mt="6" py="5">
                <Flex
                  direction="column"
                  gap="4"
                  as="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormControl>
                    <FormLabel htmlFor="name">Ask your question.</FormLabel>
                    <Input
                      {...register("name")}
                      placeholder="Write your question here"
                      type="text"
                      mt="3"
                    />
                    {errors?.title ? (
                      <FormErrorMessage mt="2">
                        {errors.name?.message?.toString()}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="description">
                      Brief Description
                    </FormLabel>
                    <FormHelperText>
                      Enter information on what members should expect.
                    </FormHelperText>
                    <Input
                      {...register("description")}
                      type="text"
                      mt="3"
                      placeholder="Write your question here"
                    />
                    {errors?.title ? (
                      <FormErrorMessage mt="2">
                        {errors.description?.message?.toString()}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap="3"
                      mt="3"
                      htmlFor="name"
                    >
                      {uploadedImage ? (
                        <FormHelperText
                          flex="1"
                          display="flex"
                          justifyContent="space-between"
                          flexDirection="column"
                          gap="3"
                        >
                          <Text>
                            Name: <strong>{uploadedImage.name}</strong>
                          </Text>
                          <Text>
                            Size:{" "}
                            <strong>
                              {Math.round(uploadedImage.size / 1000)}kb
                            </strong>
                          </Text>
                          <Text>Click to change image</Text>
                        </FormHelperText>
                      ) : (
                        <FormHelperText noOfLines={2} flex="1">
                          Provide an optional image to describe the problem
                          better. Only upload relevant images!
                        </FormHelperText>
                      )}
                      {uploadedImage ? (
                        <Box
                          borderRadius={10}
                          textAlign="center"
                          width="24"
                          height="24"
                        >
                          <Image
                            src={uploadedImage.src}
                            alt={uploadedImage.name}
                            w="full"
                            h="full"
                            borderRadius={10}
                            fit="cover"
                          />
                        </Box>
                      ) : (
                        <Box
                          borderRadius={12}
                          textAlign="center"
                          p="3"
                          width="12"
                          bg="ButtonShadow"
                        >
                          <FiDownload size={18} />
                        </Box>
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        name="image"
                        id="name"
                        onChange={handleUpload}
                        accept=".jpg, .png, .jpeg"
                      />
                    </FormLabel>
                  </FormControl>

                  <Box>
                    <Button colorScheme="blue" type="submit">
                      Create Space
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
