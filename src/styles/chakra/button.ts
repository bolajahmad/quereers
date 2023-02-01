import { defineStyleConfig, flexbox } from "@chakra-ui/react";

export const CustomChakraButton = defineStyleConfig({
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    flex_plain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "4",
      backgroundColor: "transparent",
      color: "#707070",
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
  },
});
