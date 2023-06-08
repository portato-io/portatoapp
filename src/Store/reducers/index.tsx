import { routeReducer } from './RouteReducer';
import { requestReducer } from './RequestReducer';
import { dealReducer } from './DealReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['request', 'route', 'deal'], // List of reducers to persist
};

const allReducers = combineReducers({
  request: requestReducer,
  route: routeReducer,
  deal: dealReducer,
});

export const persistedReducer = persistReducer(persistConfig, allReducers);
export default allReducers;
