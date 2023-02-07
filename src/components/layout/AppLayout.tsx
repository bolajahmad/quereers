import { Box, Flex, List, ListItem, Button } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import { IoMdLocate } from "react-icons/io";
import React from "react";
import { BaseLayout } from "./Base";
import { useSpacesData } from "../../utils/hooks";

type ComponentProps = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const { spaces, createSpace } = useSpacesData();

  console.log({ spaces });

  return (
    <BaseLayout>
      <Box width="100%" mx="auto" maxW="4xl">
        <Flex>
          <Box flex="1" maxW="240px" py="10" px="4">
            <List>
              <ListItem mb="6">
                <Button
                  variant="plain_flex"
                  color="white.7"
                  bg="#F5F5F5"
                  w="full"
                  gap="4"
                  _hover={{ bg: "#E0E0E0" }}
                  onClick={() => createSpace()}
                >
                  <MdAddCircle size={18} fill="#707070" />
                  Create Space
                </Button>
              </ListItem>
              {spaces
                ? spaces.splice(0, 7).map(({ struct, content }) => (
                    <ListItem mt="4" key={struct.id.toString()}>
                      <Button
                        width="full"
                        variant="flex_plain"
                        _hover={{ bg: "#F5F5F5" }}
                      >
                        {content?.name}
                      </Button>
                    </ListItem>
                  ))
                : null}

              <ListItem mt="6">
                <Button
                  variant="flex_plain"
                  _hover={{ bg: "#F5F5F5" }}
                  color="white.7"
                  w="full"
                >
                  <IoMdLocate size={18} fill="#707070" />
                  Discover Spaces
                </Button>
              </ListItem>
            </List>
          </Box>

          <Box flex="1">{children}</Box>
        </Flex>
      </Box>
    </BaseLayout>
  );
};
