import { Box, Flex, List, ListItem, Button } from "@chakra-ui/react";
import { IoMdLocate } from "react-icons/io";
import React from "react";
import { BaseLayout } from "./Base";
import { useSpaceProfile, useSpacesData } from "../../utils/hooks";
import { CreateSpaceModal } from "../modals";

type ComponentProps = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const { spaces } = useSpacesData();
  const { addFollowers } = useSpaceProfile(Number(spaces?.[0]?.id));

  return (
    <BaseLayout>
      <Box width="100%" mx="auto" maxW="4xl">
        <Flex>
          <Box flex="1" maxW="240px" py="10" px="4">
            <List>
              <ListItem mb="6">
                <CreateSpaceModal />
              </ListItem>
              {spaces
                ? spaces.slice(0, 7).map(({ title, id }) => (
                    <ListItem mt="4" key={id.toString()}>
                      <Button
                        width="full"
                        variant="flex_plain"
                        _hover={{ bg: "#F5F5F5" }}
                      >
                        {title}
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
                  onClick={() => addFollowers()}
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
