import { routeReducer } from './RouteReducer';
import { requestReducer } from './RequestReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  request: requestReducer,
  route: routeReducer,
});
export default allReducers;
