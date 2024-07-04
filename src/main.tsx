// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./shared/apollo/client";
const container = document.getElementById("root");
const root = createRoot(container!); // Создание корня с использованием нового API

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
