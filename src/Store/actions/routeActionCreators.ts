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
