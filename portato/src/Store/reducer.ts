import * as actionTypes from "./actionTypes"
import { AnyAction } from 'redux';
import { ObjectInfoState } from "../type";

const initialState: ObjectInfoState = {
    object:
      {
        name: 'test',
        description: "test",
        size:'test',
        weight:0,
        price:0,
        pickup_adress:"test",
        delivery_adress:"test",
        time:"test"
      }

  }


  export function reducer(state = initialState, action: AnyAction) {
    console.log(action.type)
    switch (action.type) {
      case 'SET_OBJECT': {
        console.log("DANS LE REDUCER DU SET OBJECT")
        return { ...state, object: action.payload };}

      case 'SET_ADRESS': {
          console.log("DANS LE REDUCER du SET ADRESS")
          return { ...state, object.pickup_adress: action.payload[0] };}

      default:{
        console.log("DANS LE REDUCER MAIS PAS DANS LE BON STATE")
        return state;}
    }
  }
