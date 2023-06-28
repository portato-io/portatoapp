import { AnyAction } from 'redux';
import { IRouteInfo } from '../../type';

const initialStateRoute: IRouteInfo = {
  id: '0',
  uid: '0',
  departure_adress: '',
  destination_adress: '',
  acceptable_detour: 0,
  time: [],
  timeRange: '',
  type: '',
  days: [],
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
    case 'SET_ID': {
      return {
        ...state,
        id: action.payload,
      };
    }
    case 'SET_UID': {
      return {
        ...state,
        uid: action.payload,
      };
    }
    case 'SET_ROUTE_DEPARTURE_ADDRESS': {
      return {
        ...state,
        departure_adress: action.payload,
      };
    }
    case 'SET_ROUTE_DESTINATION_ADDRESS': {
      return {
        ...state,
        destination_adress: action.payload,
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
        time: action.payload.time,
      };
    }
    case 'SET_TYPE': {
      return {
        ...state,
        type: action.payload.type,
      };
    }
    case 'SET_ROUTE_DATE_RANGE': {
      return { ...state, timeRange: action.payload };
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

    case 'SET_ROUTE_STATUS': {
      return {
        ...state,
        routeStatus: action.payload.routeStatus,
      };
    }

    case 'EMPTY_STATE':
      return initialStateRoute;

    default: {
      return state;
    }
  }
}
