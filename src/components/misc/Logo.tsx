import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const LogoComponent = () => {
  return (
    <Box>
      <Heading
        as={Link}
        to="/"
        fontWeight={600}
        color="primary.1"
        fontFamily="fancy"
      >
        Quereers
      </Heading>
    </Box>
  );
};
