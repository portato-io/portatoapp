import * as actionTypes from '../actionTypes/requestActionTypes';
import { IFirstObjectInfo } from '../../type';
import { EMPTY_STATE } from '../actionTypes/commonActionTypes';
import { AnyAction } from 'redux';

export const setObject = (variable: IFirstObjectInfo): AnyAction => ({
  type: actionTypes.SET_OBJECT,
  payload: variable,
});

export const setReqPickupAddress = (pickup_address: string): AnyAction => ({
  type: actionTypes.SET_REQ_PICKUP_ADDRESS,
  payload: pickup_address,
});

export const setReqDeliveryAddress = (delivery_address: string): AnyAction => ({
  type: actionTypes.SET_REQ_DELIVERY_ADDRESS,
  payload: delivery_address,
});

export const setObjectPrice = (price: number): AnyAction => ({
  type: actionTypes.SET_PRICE,
  payload: price,
});

export const setObjectId = (id: string): AnyAction => ({
  type: actionTypes.SET_ID,
  payload: id,
});

export const setObjectDateRange = (dateRange: string[]): AnyAction => ({
  type: actionTypes.SET_DATE_RANGE,
  payload: dateRange,
});

export const setObjectTime = (time: string): AnyAction => ({
  type: actionTypes.SET_TIME,
  payload: time,
});

export const addObjectImages = (images: string[]): AnyAction => ({
  type: actionTypes.ADD_IMAGE,
  payload: images,
});

export const removeObjectImages = (position: number): AnyAction => ({
  type: actionTypes.REMOVE_IMAGE,
  payload: position,
});

export const setReqUid = (uid: string): AnyAction => ({
  type: actionTypes.SET_UID,
  payload: uid,
});

export const setStatus = (status: string): AnyAction => ({
  type: actionTypes.SET_STATUS,
  payload: status,
});

export const emptyState = (): AnyAction => ({
  type: EMPTY_STATE,
});
