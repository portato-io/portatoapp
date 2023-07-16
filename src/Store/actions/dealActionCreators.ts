import * as actionTypes from '../actionTypes/dealActionTypes';
import { AnyAction } from 'redux';
import { IRequestInfo, IRouteInfo } from '../../type';

export const setDealId = (id: string): AnyAction => ({
  type: actionTypes.SET_ID,
  payload: id,
});

export const setRoute = (route: IRouteInfo): AnyAction => ({
  type: actionTypes.SET_ROUTE,
  payload: route,
});

export const setStatus = (status: string): AnyAction => ({
  type: actionTypes.SET_STATUS,
  payload: status,
});

export const setDealRequest = (request: IRequestInfo): AnyAction => ({
  type: actionTypes.SET_DEAL_REQ,
  payload: request,
});
