import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Stack,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoChevronDownSharp } from "react-icons/io5";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { LogoComponent } from "../misc/Logo";
import { useGetAccount } from "../../utils/hooks";

const BaseLayoutStyles = styled(Container)``;

type ComponentProps = {
  children?: React.ReactNode;
};

export const BaseLayout: React.FC<ComponentProps> = ({ children }) => {
  const { account, isConnected, accounts, updateSelectedAccount } =
    useGetAccount();

  console.log({ account });
  return (
    <BaseLayoutStyles minW="100vw" px="0" maxW="100vw" height="100vh">
      <Flex direction="column" h="100%">
        <Stack px="40" py="2">
          <HStack spacing="12" justifyContent="space-between">
            <LogoComponent />

            <Flex gap="6">
              <Button
                variant="outline"
                as={Link}
                to="/spaces"
                borderColor="bg.btn1"
                _hover={{ background: "#95234b14" }}
                color="bg.btn1"
              >
                View Spaces
              </Button>
              <Button
                variant="outline"
                borderColor="bg.btn1"
                _hover={{ background: "#95234b14" }}
                color="bg.btn1"
                as={Link}
                to="/ask"
              >
                Ask Question
              </Button>
            </Flex>

            <Input type="search" maxW="25em" placeholder="Search Quereers" />

            <Flex gap="4" alignItems="center">
              {isConnected ? (
                <>
                  <Button
                    background="bg.btn1"
                    color="white"
                    _hover={{ bg: "bg.btn1" }}
                  >
                    Profile
                  </Button>
                  <Menu>
                    <MenuButton
                      bg="none"
                      as={Button}
                      border="1px dashed currentColor"
                      color="bg.btn1"
                      fontWeight={600}
                      py="2"
                      px="1"
                      borderRadius={5}
                      rightIcon={<IoChevronDownSharp />}
                    >
                      <Text as="p" whiteSpace="nowrap" w="fit-content">
                        {account?.name}:&nbsp;{account?.source}
                      </Text>
                    </MenuButton>
                    <MenuList>
                      {accounts?.map(({ address, source, name }) => (
                        <MenuItem
                          key={address}
                          onClick={() => updateSelectedAccount(address)}
                        >
                          <Text>{name ?? "N/A"}</Text>
                          <Text>{source}</Text>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <Button
                  bgColor="#3D1C00"
                  color="white"
                  _hover={{ bg: "#3D1C00" }}
                >
                  Connect Wallet
                </Button>
              )}
            </Flex>
          </HStack>
        </Stack>

        <Box bg="bg.base" flex="1">
          {children}
        </Box>
      </Flex>
    </BaseLayoutStyles>
  );
};
