import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import { SubsocialContextProvider } from "./subsocial/provider";
import { Router } from "./utils/routes";

const theme = extendTheme({
  colors: {
    primary: {
      1: "#52gg62",
    },
    bg: {
      base: "#EAE9D7",
      btn1: "#95234B",
    },
    white: {
      1: "#fff",
    },
  },
  fonts: {
    fancy: "Dancing Script",
    primary: "Assistant",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SubsocialContextProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={Router} />
      </ChakraProvider>
    </SubsocialContextProvider>
  </React.StrictMode>
);
