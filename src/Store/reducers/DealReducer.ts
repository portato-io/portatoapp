import { AnyAction } from 'redux';
import { IDealInfo } from '../../type';

const initialStateDeal: IDealInfo = {
  id: '0',
  request: {
    id: '0',
    uid: '0',
    name: '',
    description: '',
    size: '',
    weight: '',
    price: 0,
    pickup_adress: '',
    delivery_adress: '',
    dateRange: [],
    time: '',
    images: [],
    status: 'unmatched',
    dealId: '',
    contactTimestamp: '',
  },
  route: {
    id: '0',
    uid: '0',
    departure_adress: '',
    destination_adress: '',
    acceptable_detour: 0,
    time: [],
    type: '',
    days: [],
    timeRange: '',
    delivery_capacity: '',
  },
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
    case 'SET_REQ': {
      return {
        ...state,
        request: action.payload,
      };
    }
    case 'SET_ROUTE': {
      return {
        ...state,
        route: action.payload,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.payload,
      };
    }
    default: {
      console.error('Unknown action type in dealReducer', action.type);
      return state;
    }
  }
}
