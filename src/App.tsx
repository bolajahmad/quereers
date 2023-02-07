import "./App.css";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// This is the start of the React app built using Subsocial Starter.
export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
