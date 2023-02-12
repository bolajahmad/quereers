import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";

interface Props {
  handleClose: () => void;
  onFormSubmit: () => void;
}

export function QuestionForm({ handleClose, onFormSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (model: any) => {
    console.log({ model });
    onFormSubmit();
  };

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
              <FormErrorMessage>
                {errors.title?.message?.toString()}
              </FormErrorMessage>
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
            {errors?.title ? (
              <FormErrorMessage>
                {errors.title?.message?.toString()}
              </FormErrorMessage>
            ) : null}
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <Flex
              as={FormLabel}
              alignItems="center"
              justifyContent="flex-start"
              gap="3"
              htmlFor="question"
            >
              <FormHelperText noOfLines={2} flex="1">
                Provide an optional image to describe the problem better. Only
                upload relevant images!
              </FormHelperText>
              <Box
                borderRadius={12}
                textAlign="center"
                p="3"
                width="12"
                bg="ButtonShadow"
              >
                <FiDownload size={18} />
              </Box>
              <VisuallyHiddenInput type="file" accept=".jpg, .png, .jpeg" />
            </Flex>
            {errors?.title ? (
              <FormErrorMessage>
                {errors.title?.message?.toString()}
              </FormErrorMessage>
            ) : null}
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
