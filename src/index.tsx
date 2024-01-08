import ReactDOM from 'react-dom/client';
import './index.css';
// const LazyLoadedApp = lazy(() => import('./App'));
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

import { hotjar } from 'react-hotjar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistedReducer } from './Store/reducers';
import { persistStore } from 'redux-persist';
import { IRequestInfo, IRouteInfo } from './type';
// const LazyAuthProvider = lazy(() => import('./Components/AuthProvider'));

//Import i18n.ts
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Suspense, lazy } from 'react';
import LogoPage from './Components/loading';
import App from './App';

// Initialize Hotjar:
const HOTJAR_ID = 3614898;
const HOTJAR_VERSION = 6;
hotjar.initialize(HOTJAR_ID, HOTJAR_VERSION);

const initialStateRequest: IRequestInfo = {
  id: '0',
  uid: '0',
  name: '',
  description: '',
  size: '',
  weight: '',
  price: 50,
  pickup_adress: '',
  delivery_adress: '',
  dateRange: ['', ''],
  time: '',
  images: [],
  status: 'unmatched',
  dealId: '',
  contactTimestamp: '',
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
  type: 'Single trip',
  days: [],
  delivery_capacity: '',
  routeStatus: '',
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
function Loading() {
  return <div></div>;
}
root.render(
  <Provider store={store}>
    <PersistGate loading={<LogoPage />} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loading />}>
          {/* <LazyAuthProvider> */}
          <App />
          {/* </LazyAuthProvider> */}
        </Suspense>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

// Mehdi: If we want the app to work offline, we need register,
// If not change to unregister()
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
