import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client.ts";
import { UserProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>
);
