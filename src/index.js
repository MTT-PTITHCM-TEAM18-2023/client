import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./style/variable.scss";
import "./style/global.scss";
import "./style/mixin.scss";
import "antd/dist/antd.css";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./store"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
