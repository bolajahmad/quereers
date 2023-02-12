import {
  Flex,
  Input,
  List,
  ListItem,
  Text,
  Button,
  Box,
  Circle,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { ISpace } from "../../models/response";

type AcceptedSearchType =
  | ISpace
  | (Record<string, any> & { id: string | number });

interface SearchInputProps<T> {
  searchData: T[];
  handleChange: (query: string) => void;
  onItemClick: (item?: T) => void;
  listFooter: React.ReactNode | null;
}

export const SearchInput: React.FC<SearchInputProps<AcceptedSearchType>> = ({
  searchData,
  handleChange,
  onItemClick,
  listFooter: ListFooter,
}) => {
  const [query, setQuery] = useState("");

  return (
    <Box position="relative" border="1px solid #707070" borderRadius="4px">
      <Flex alignItems="center" gap="2" px="3" justifyContent="flex-start">
        <FiSearch size={24} />

        <Input
          type="search"
          value={query}
          border="none"
          flex="1"
          w="full"
          _focus={{
            border: "none",
            outline: "none",
          }}
          _focusVisible={{
            boxShadow: "none",
          }}
          outline="none"
          onChange={({ target }) => setQuery(target.value)}
        />
      </Flex>

      {query.length ? (
        <Box
          position="absolute"
          overflow="auto"
          minHeight="fit-content"
          zIndex={1}
          py="4"
          background="white"
          border="1px solid #070707"
          maxH="20em"
          borderRadius={4}
          left="0"
          right="0"
        >
          <List>
            {searchData?.map((data) => (
              <ListItem px="3" key={data.id} onClick={() => onItemClick(data)}>
                <Flex gap="4">
                  <Circle bg="bisque" size={12} />
                  <Flex
                    flex="1"
                    direction="column"
                    gap="2"
                    alignItems="flex-start"
                    justifyContent="center"
                  >
                    <Text fontWeight="bolder">Space 1</Text>
                    <Text>10 Members</Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}

            {ListFooter}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};
