import { AnyAction } from 'redux';
import { IDealInfo } from '../../type';

const initialStateDeal: IDealInfo = {
  id: '0',
  request_uid: '0',
  route_uid: '0',
  request_id: '0',
  route_id: '0',
  status: 'unknown',
};

export function dealReducer(
  state: any = initialStateDeal,
  action: AnyAction
): IDealInfo {
  switch (action.type) {
    case 'SET_ID': {
      return {
        ...state,
        id: action.payload,
      };
    }
    case 'SET_REQ_ID': {
      return {
        ...state,
        request_id: action.payload,
      };
    }
    case 'SET_ROUTE_ID': {
      return {
        ...state,
        route_id: action.payload,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.payload,
      };
    }
    case 'SET_ROUTE_UID': {
      return {
        ...state,
        route_uid: action.payload,
      };
    }
    case 'SET_REQ_UID': {
      return {
        ...state,
        request_uid: action.payload,
      };
    }
    default: {
      console.log('DANS LE DRIVER REDUCER MAIS PAS DANS LE BON STATE');
      return state;
    }
  }
}
