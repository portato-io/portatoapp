import * as actionTypes from "./actionTypes"
import { IObjectInfo,ObjectInfoAction } from "../type"
import { AnyAction } from "redux";
/*export function setObject(object: IObjectInfo) {
  const action: ObjectInfoAction = {
    type: actionTypes.SET_OBJECT,
    object,
  }

}*/

export const setObject = (variable: IObjectInfo): AnyAction => ({
  type: actionTypes.SET_OBJECT,
  payload: variable,
});


export const setObjectAdress = (pickup_adress:string, delivery_adress:string): AnyAction => ({
  type: actionTypes.SET_ADRESS,
  payload: pickup_adress,delivery_adress,
});
