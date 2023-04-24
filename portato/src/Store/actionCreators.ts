import * as actionTypes from "./actionTypes";
import { IFirstObjectInfo, IObjectInfo, ObjectInfoAction } from "../type";
import { AnyAction } from "redux";
/*export function setObject(object: IObjectInfo) {
  const action: ObjectInfoAction = {
    type: actionTypes.SET_OBJECT,
    object,
  }

}*/

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

export const setObjectDateRange = (dateRange: string[]): AnyAction => ({
  type: actionTypes.SET_DATE_RANGE,
  payload: dateRange,
});

export const setObjectTime = (time: string): AnyAction => ({
  type: actionTypes.SET_TIME,
  payload: time,
});

export const setObjectImages = (images: string[]): AnyAction => ({
  type: actionTypes.SET_IMAGE,
  payload: images,
});
