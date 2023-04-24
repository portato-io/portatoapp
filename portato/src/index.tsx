import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./Store/reducer";
import { IObjectInfo, ObjectInfoState } from "./type";

const initialState: IObjectInfo = {
  name: "",
  description: "",
  size: "S",
  weight: "-5 kg",
  price: 0,
  pickup_adress: "",
  delivery_adress: "",
  dateRange: ["", ""],
  time: "",
  images: [""],
};

export const store = createStore(reducer, initialState);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Mehdi: If we want the app to work offline, we need register,
// If not change to unregister()
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
