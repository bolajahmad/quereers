import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  ModalFooter,
  Text,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { FiDownload } from "react-icons/fi";
import { CreatePostModel } from "../../../models/request";

interface Props {
  handleClose: () => void;
  onFormSubmit: (model: any) => void;
}

export function QuestionForm({ handleClose, onFormSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    // resolver: classValidatorResolver(CreatePostModel),
    reValidateMode: "onBlur",
    defaultValues: new CreatePostModel(),
  });
  const [uploadedImage, setUploadedImage] = useState<{
    name: string;
    src: string;
    size: number;
  }>();

  const onSubmit = (model: CreatePostModel) => {
    onFormSubmit(model);
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
  console.log({ errors });

  return (
    <Box mt="6">
      <Flex
        direction="column"
        gap="6"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <FormControl>
            <FormLabel htmlFor="title">
              Title
              <FormHelperText>
                Enter a brief title, best as a oneliner. Max 30 characters
              </FormHelperText>
            </FormLabel>
            <Input
              type="title"
              {...register("title")}
              borderBottom="1px solid gray.800"
            />
            {errors?.title ? (
              <Box color="red" fontSize="small" mt="2" fontWeight="bold">
                {errors.title?.message as string}
              </Box>
            ) : null}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor="question">Ask your question.</FormLabel>
            <Textarea
              {...register("question")}
              border="none"
              disabled={getValues("question")?.length >= 1000}
              placeholder="Write your question here"
              borderBottom="1px solid gray.800"
            />
            {errors?.question ? (
              <Box color="red" fontSize="small" mt="2" fontWeight="bold">
                {errors.question?.message as string}
              </Box>
            ) : null}
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap="3"
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
                    <strong>{Math.round(uploadedImage.size / 1000)}kb</strong>
                  </Text>
                  <Text>Click to change image</Text>
                </FormHelperText>
              ) : (
                <FormHelperText noOfLines={2} flex="1">
                  Provide an optional image to describe the problem better. Only
                  upload relevant images!
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
        </Box>

        <ModalFooter mt="8">
          <Button variant="ghost" mr={3} onClick={() => handleClose()}>
            Cancel
          </Button>

          <Button colorScheme="blue" type="submit">
            Done
          </Button>
        </ModalFooter>
      </Flex>
    </Box>
  );
}
