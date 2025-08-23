import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { HeroUiProvider } from "./providers/provider.tsx";

import "@/styles/globals.css";
import "@/styles/index.css";

import { store } from "@/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HeroUiProvider>
          <App />
        </HeroUiProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
