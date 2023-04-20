import * as actionTypes from "./actionTypes"
import { AnyAction } from 'redux';
import { IObjectInfo, ObjectInfoState } from "../type";


  export function reducer(state: any, action: AnyAction): IObjectInfo {
    console.log(action.type)
    switch (action.type) {

      case 'SET_OBJECT': {
        console.log(action.payload)
        return { ...state,
        name : action.payload.name,
        description: action.payload.description,
        size : action.payload.size,
        weight: action.payload.weight
        }}

      case 'SET_ADRESS': {
          console.log(state)
          return{
            ...state,
            pickup_adress: action.payload.pickup_adress,
            delivery_adress: action.payload.delivery_adress,
          }}

      case 'SET_PRICE':{

        return { ...state,
          price:action.payload,
        } ;}

      case 'SET_TIME':{

        return{...state,
          time: action.payload,} ;

      }

      case 'SET_DATE_RANGE':{

        return{...state,
            dateRange:action.payload
          }
      }

      default:{
        console.log("DANS LE REDUCER MAIS PAS DANS LE BON STATE")
        return state;}
    }
  }
