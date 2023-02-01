import { Box, Flex, List, ListItem, Button } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import { IoMdLocate } from "react-icons/io";
import React, { useContext } from "react";
import { useGetAccount } from "../../utils/hooks";
import { BaseLayout } from "./Base";
import { SubsocialContext } from "../../subsocial/provider";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { SubsocialService } from "../../services";

type ComponentProps = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const { account, getNetworkName } = useGetAccount();
  const { isReady, api, network } = useContext(SubsocialContext);

  console.log({ account });

  // Creating a space on Subsocial network.
  const createSpace = async () => {
    // Always assure, the [api] is not null using [isReady] property.
    if (!isReady) {
      console.log({ message: "Unable to connect to the API." });
      return;
    }

    if (!account) {
      console.log({ message: "There is connected account." });
      return;
    }

    if (getNetworkName(network) === "Mainnet") {
      console.log({
        message: "You need to use your own IPFS endpoint to store data.",
      });
      return;
    }

    // To change the IPFS either pass [CustomNetwork] or call [setupCrustIPFS] with
    // your mnemonic (MAKE SURE TO HIDE MNEOMIC BEFORE UPLOADING TO PUBLIC NETWORK).
    const cid = await api!.ipfs.saveContent({
      about:
        "Subsocial is an open protocol for decentralized social networks and marketplaces. It`s built with Substrate and IPFS",
      image: null,
      name: "Subsocial",
      tags: ["subsocial"],
    });
    console.log({ cid });
    const substrateApi = await api!.blockchain.api;

    const spaceTransaction = substrateApi.tx.spaces.createSpace(
      IpfsContent(cid),
      null // Permissions config (optional)
    );
    console.log({ spaceTransaction });

    await SubsocialService.signAndSendTx(spaceTransaction, account.address);
    alert("API response added in browser console logs.");
  };

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
              {[
                "Javascript",
                "Typescript",
                "Solidity",
                "Substrate",
                "Rust",
              ].map((space, index) => (
                <ListItem mt="4" key={index}>
                  <Button
                    width="full"
                    variant="flex_plain"
                    _hover={{ bg: "#F5F5F5" }}
                  >
                    {space}
                  </Button>
                </ListItem>
              ))}

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
