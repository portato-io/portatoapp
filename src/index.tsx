import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './Store/reducers';
import { IObjectInfo, IRouteInfo } from './type';

const initialStateRequest: IObjectInfo = {
  name: '',
  description: '',
  size: 'S',
  weight: '-5 kg',
  price: 0,
  pickup_adress: '',
  delivery_adress: '',
  dateRange: ['', ''],
  time: '',
  images: [],
};
console.log('Commit Hash:', process.env.REACT_APP_COMMIT_HASH);

const initialStateRoute: IRouteInfo = {
  id: 0,
  departure_adress: '',
  destination_adress: '',
  acceptable_detour: 0,
  time: '',
  delivery_capacity: '',
};

const initialState = {
  request: initialStateRequest,
  route: initialStateRoute,
};

export const store = createStore(allReducers, initialState);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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
