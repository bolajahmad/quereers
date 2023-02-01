import { Heading } from "@chakra-ui/react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LandingPage } from "../pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "ask",
        element: <Heading>Ask a Question</Heading>,
      },
      {
        path: "questions",
        element: <Heading>View Questions</Heading>,
      },
      {
        path: "spaces",
        element: <Heading>View Spaces</Heading>,
      },
    ],
  },
]);
