import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom"
      ></ReactQueryDevtools>
    </StrictMode>
  </QueryClientProvider>
);
