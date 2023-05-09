import { AnyAction } from 'redux';
import { IRouteInfo } from '../../type';
import { SET_DETOUR } from '../actionTypes/routeActionTypes';

const initialStateRoute: IRouteInfo = {
  id: 0,
  departure_adress: '',
  destination_adress: '',
  acceptable_detour: 0,
  time: '',
  delivery_capacity: '',
};

export function routeReducer(
  state: any = initialStateRoute,
  action: AnyAction
): IRouteInfo {
  console.log(action.type);
  switch (action.type) {
    case 'SET_ROUTE': {
      console.log(state);
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
    default: {
      console.log('DANS LE DRIVER REDUCER MAIS PAS DANS LE BON STATE');
      return state;
    }
  }
}
