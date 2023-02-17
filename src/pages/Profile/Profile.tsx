import {
  Box,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BaseLayout } from "../../components/layout";

const ProfilePage = () => {
  return (
    <BaseLayout>
      <Box py="10">
        <Flex
          direction="column"
          maxW="xl"
          margin="auto"
          gap="4"
          px="8"
          py="4"
          alignItems="center"
        >
          <Box flex="1" w="full">
            <Flex>
              <Circle bg="gray.400" />

              <Box>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input value="Jamal Jones" type="text" name="name" />
                </FormControl>

                <FormControl>
                  <FormLabel>Qualification(s)</FormLabel>
                  <Input type="text" value="Social Activist" />
                </FormControl>

                <Box mt="4=``">
                  <List>
                    <FormControl as={Flex} alignItems="center" gap="3">
                      <FormLabel>Twitter</FormLabel>
                      <Input value="@jamaljones" type="twitter" />
                    </FormControl>
                    <FormControl as={Flex} alignItems="center" gap="3">
                      <FormLabel>LinkedIn</FormLabel>
                      <Input value="jamaljones" type="linkedin" />
                    </FormControl>
                    <FormControl alignItems="center" gap="3" as={Flex}>
                      <FormLabel>Discord</FormLabel>
                      <Input value="jamaljones#4253" type="discord" />
                    </FormControl>
                  </List>
                </Box>

                <Flex>
                  <Text>1 Follower</Text>
                  &bull;
                  <Text>0 Following</Text>
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box w="full" mt="6">
            <FormControl>
              <FormLabel>Description about yourself</FormLabel>
              <Textarea placeholder="Write a description about yourself" />
            </FormControl>
          </Box>

          <Box w="full" mt="6">
            <Tabs>
              <TabList>
                <Tab>Answers</Tab>
                <Tab>Questions</Tab>
                <Tab>Leaderboard Rankings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>All Your Answers Will Show Uup Here</TabPanel>
                <TabPanel>All your questions will show up here</TabPanel>
                <TabPanel>Here, you can see the leaderboard ranking</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Box>
    </BaseLayout>
  );
};

export default ProfilePage;
