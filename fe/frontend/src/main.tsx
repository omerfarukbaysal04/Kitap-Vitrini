import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { SWRConfig } from "swr";
import { httpFetcher } from "./http";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: httpFetcher,
        }}
      >
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
