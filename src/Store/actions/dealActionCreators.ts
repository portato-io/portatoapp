import * as actionTypes from '../actionTypes/dealActionTypes';
import { AnyAction } from 'redux';

export const setDealId = (id: string): AnyAction => ({
  type: actionTypes.SET_ID,
  payload: id,
});

export const setRouteId = (id: string): AnyAction => ({
  type: actionTypes.SET_ROUTE_ID,
  payload: id,
});

export const setStatus = (status: string): AnyAction => ({
  type: actionTypes.SET_STATUS,
  payload: status,
});

export const setRequestId = (id: string): AnyAction => ({
  type: actionTypes.SET_REQ_ID,
  payload: id,
});

export const setRequestUid = (uid: string): AnyAction => ({
  type: actionTypes.SET_REQ_UID,
  payload: uid,
});

export const setRouetUid = (uid: string): AnyAction => ({
  type: actionTypes.SET_ROUTE_UID,
  payload: uid,
});
