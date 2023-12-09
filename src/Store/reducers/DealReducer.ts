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
    price: 10,
    pickup_address: '',
    delivery_address: '',
    dateRange: [],
    time: '',
    images: [],
    status: 'unmatched',
    dealId: '',
    contactTimestamp: '',
    delivery_coordinates: [0, 0],
    pickup_coordinates: [0, 0],
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
    routeStatus: '',
  },
  status: 'unknown',
};

export function dealReducer(
  state: IDealInfo = initialStateDeal,
  action: AnyAction
): IDealInfo {
  switch (action.type) {
    case 'SET_ID': {
      return {
        ...state,
        id: action.payload,
      };
    }
    case 'SET_DEAL_REQ': {
      return {
        ...state,
        request: action.payload,
      };
    }
    case 'SET_INIT_ROUTE': {
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
      return state;
    }
  }
}
