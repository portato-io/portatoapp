import { routeReducer } from './RouteReducer';
import { requestReducer } from './RequestReducer';
import { dealReducer } from './DealReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  request: requestReducer,
  route: routeReducer,
  deal: dealReducer,
});
export default allReducers;
