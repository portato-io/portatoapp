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
        dateRange:["",""],
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
          return { ...state, object:{
            name: state.object.name,
            description: state.object.description,
            size:state.object.size,
            weight:state.object.weight,
            price:state.object.price,
            pickup_adress: action.payload.pickup_adress,
            delivery_adress: action.payload.delivery_adress,
            time: state.object.time,
            dateRange:state.object.dateRange
          } };}

      case 'SET_PRICE':{

        return { ...state, object:{
          name: state.object.name,
          description: state.object.description,
          size:state.object.size,
          weight:state.object.weight,
          price:action.payload,
          pickup_adress: state.object.pickup_adress,
          delivery_adress: state.object.delivery_adress,
          time: state.object.time,
          dateRange:state.object.dateRange
        } };}

      case 'SET_TIME':{
        console.log(action.payload[0])
        return{...state,object:{
          name: state.object.name,
          description: state.object.description,
          size:state.object.size,
          weight:state.object.weight,
          price:state.object.price,
          pickup_adress: state.object.pickup_adress,
          delivery_adress: state.object.delivery_adress,
          time: action.payload,
          dateRange: state.object.dateRange} };

      }

      case 'SET_DATE_RANGE':{

        return{...state,
            object:{
            name: state.object.name,
            description: state.object.description,
            size:state.object.size,
            weight:state.object.weight,
            price:state.object.price,
            pickup_adress: state.object.pickup_adress,
            delivery_adress: state.object.delivery_adress,
            time: state.object.time,
            dateRange:action.payload}


        }
      }

      default:{
        console.log("DANS LE REDUCER MAIS PAS DANS LE BON STATE")
        return state;}
    }
  }
