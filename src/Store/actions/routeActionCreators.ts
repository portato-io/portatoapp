import * as actionTypes from '../actionTypes/routeActionTypes';
import { AnyAction } from 'redux';
import { EMPTY_STATE } from '../actionTypes/commonActionTypes';

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

export const setRouteDepartureAddress = (departure: string): AnyAction => ({
  type: actionTypes.SET_ROUTE_DEPARTURE_ADDRESS,
  payload: departure,
});

export const setRouteDestinationAddress = (destination: string): AnyAction => ({
  type: actionTypes.SET_ROUTE_DESTINATION_ADDRESS,
  payload: destination,
});

export const setDetour = (detour: number): AnyAction => ({
  type: actionTypes.SET_DETOUR,
  payload: {
    detour,
  },
});

export const setTime = (time: string): AnyAction => ({
  type: actionTypes.SET_TIME,
  payload: {
    time,
  },
});

export const setDays = (days: string): AnyAction => ({
  type: actionTypes.SET_DAYS,
  payload: {
    days,
  },
});

export const setType = (type: string): AnyAction => ({
  type: actionTypes.SET_TYPE,
  payload: {
    type,
  },
});

export const setCap = (capacity: string): AnyAction => ({
  type: actionTypes.SET_CAP,
  payload: {
    capacity,
  },
});

export const setRouteId = (id: string): AnyAction => ({
  type: actionTypes.SET_ID,
  payload: id,
});

export const setRouteDateRange = (dateRange: string[]): AnyAction => ({
  type: actionTypes.SET_ROUTE_DATE_RANGE,
  payload: dateRange,
});

export const setRouteUid = (uid: string): AnyAction => ({
  type: actionTypes.SET_UID,
  payload: uid,
});

export const emptyState = (): AnyAction => ({
  type: EMPTY_STATE,
});
