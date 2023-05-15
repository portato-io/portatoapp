import { AnyAction } from 'redux';
import { IRouteInfo } from '../../type';

const initialStateRoute: IRouteInfo = {
  id: 0,
  departure_adress: '',
  destination_adress: '',
  acceptable_detour: 0,
  time: [],
  timeRange: '',
  type: '',
  days: '',
  delivery_capacity: '',
};

export function routeReducer(
  state: any = initialStateRoute,
  action: AnyAction
): IRouteInfo {
  switch (action.type) {
    case 'SET_ROUTE': {
      return {
        ...state,
        departure_adress: action.payload.departure_adress,
        destination_adress: action.payload.destination_adress,
      };
    }
    case 'SET_DETOUR': {
      return {
        ...state,
        acceptable_detour: action.payload.detour,
      };
    }
    case 'SET_TIME': {
      return {
        ...state,
        time: action.payload,
      };
    }
    case 'SET_TYPE': {
      return {
        ...state,
        type: action.payload.type,
      };
    }
    case 'SET_TIMERANGE': {
      return {
        ...state,
        timeRange: action.payload.timeRange,
      };
    }
    case 'SET_DAYS': {
      return {
        ...state,
        days: action.payload.days,
      };
    }
    case 'SET_CAP': {
      return {
        ...state,
        delivery_capacity: Object.values(action.payload)[0],
      };
    }
    default: {
      console.log('DANS LE DRIVER REDUCER MAIS PAS DANS LE BON STATE');
      return state;
    }
  }
}
