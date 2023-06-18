import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistedReducer } from './Store/reducers';
import { persistStore } from 'redux-persist';
import { IRequestInfo, IRouteInfo } from './type';
import { AuthProvider } from './Components/AuthProvider';

//Import i18n.ts
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

const initialStateRequest: IRequestInfo = {
  id: '0',
  uid: '0',
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
  matched: false,
};
console.log('Commit Hash:', process.env.REACT_APP_COMMIT_HASH);

const initialStateRoute: IRouteInfo = {
  id: '0',
  uid: '0',
  departure_adress: '',
  destination_adress: '',
  acceptable_detour: 0,
  time: [''],
  timeRange: '',
  type: '',
  days: '',
  delivery_capacity: '',
};

const initialState = {
  request: initialStateRequest,
  route: initialStateRoute,
};

export const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </AuthProvider>
);

// Mehdi: If we want the app to work offline, we need register,
// If not change to unregister()
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
