import * as actionTypes from "./actionTypes"
import { AnyAction } from 'redux';
import { ObjectInfoState } from "../type";

const initialState: ObjectInfoState = {
    object:
      {
        name: 'test',
        description: "test",
        size:'test',
        weight:0
      }

  }


  export function reducer(state = initialState, action: AnyAction) {
    console.log(action.type)
    switch (action.type) {
      case 'SET_OBJECT': {
        console.log("DANS LE PUTAIN DE REDUCER")
        return { ...state, object: action.payload };}
      default:{
        console.log("DANS LE PUTAIN DE REDUCER MAIS PAS DANS LE BON STATE")
        return state;}
    }
  }
