import * as actionTypes from '../actionTypes/routeActionTypes';
import { AnyAction } from 'redux';

export const setRoute = (
  departure_adress: string,
  destination_adress: string
): AnyAction => ({
  type: actionTypes.SET_ROUTE,
  payload: {
    departure_adress,
    destination_adress,
  },
});

export const setDetour = (detour: number): AnyAction => ({
  type: actionTypes.SET_DETOUR,
  payload: {
    detour,
  },
});
