import { AnyAction } from 'redux';
import { IDealInfo } from '../../type';

const initialStateRoute: IDealInfo = {
  id: '0',
  request_id: '0',
  route_id: '0',
  status: 'unknown',
};

export function dealReducer(
  state: any = initialStateRoute,
  action: AnyAction
): IDealInfo {
  switch (action.type) {
    case 'SET_ID': {
      return {
        ...state,
        id: action.payload.id,
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
