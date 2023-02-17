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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { IoChevronDownSharp } from "react-icons/io5";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoComponent } from "../misc/Logo";
import { SubsocialContext } from "../../subsocial/provider";

const BaseLayoutStyles = styled(Container)``;

type ComponentProps = {
  children?: React.ReactNode;
};

export const BaseLayout: React.FC<ComponentProps> = ({ children }) => {
  const navigate = useNavigate();
  const {
    isReady,
    initialize,
    selectedAccount: account,
    accounts,
    updateSelectedAccount,
  } = useContext(SubsocialContext);

  return (
    <BaseLayoutStyles minW="100vw" px="0" maxW="100vw" height="100vh">
      <Flex direction="column" h="100%">
        <Stack px="40" py="2" maxW="80vw" mx="auto">
          <HStack spacing="12" justifyContent="space-between">
            <LogoComponent />

            <Flex gap="6">
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
              {isReady ? (
                <>
                  <Button
                    background="bg.btn1"
                    color="white"
                    onClick={() => navigate("/profile")}
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
                      <MenuItem _hover={{ bgColor: "transparent" }}>
                        <Grid
                          w="full"
                          fontWeight="bolder"
                          gridTemplateColumns="7em 1fr"
                          gap="2"
                        >
                          <GridItem color="gray.600">Source</GridItem>
                          <GridItem color="gray.600">Name</GridItem>
                        </Grid>
                      </MenuItem>
                      {accounts?.map(({ address, source, name }) => (
                        <MenuItem
                          key={address}
                          onClick={() => updateSelectedAccount(address)}
                        >
                          <Grid w="full" gridTemplateColumns="7em 1fr" gap="2">
                            <GridItem
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              overflow="hidden"
                            >
                              {source}
                            </GridItem>
                            <GridItem
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              overflow="hidden"
                            >
                              {name ?? "N/A"}
                            </GridItem>
                          </Grid>
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
                  onClick={() => initialize()}
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
