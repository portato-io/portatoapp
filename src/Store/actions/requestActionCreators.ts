import * as actionTypes from '../actionTypes/requestActionTypes';
import { IFirstObjectInfo } from '../../type';
import { AnyAction } from 'redux';

export const setObject = (variable: IFirstObjectInfo): AnyAction => ({
  type: actionTypes.SET_OBJECT,
  payload: variable,
});

export const setObjectAdress = (
  pickup_adress: string,
  delivery_adress: string
): AnyAction => ({
  type: actionTypes.SET_ADRESS,
  payload: {
    pickup_adress,
    delivery_adress,
  },
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
