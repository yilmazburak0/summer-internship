import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'

import 'react-toastify/dist/ReactToastify.css';
import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

import App from "./App";

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter >
          <ToastContainer />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);