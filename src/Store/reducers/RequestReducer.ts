import { AnyAction } from 'redux';
import { IRequestInfo } from '../../type';

const initialState: IRequestInfo = {
  id: '0',
  uid: '0',
  name: '',
  description: '',
  size: 'S',
  weight: '-5 kg',
  price: 0,
  pickup_adress: '',
  delivery_adress: '',
  dateRange: ['', ''],
  time: '',
  images: [],
};

export function requestReducer(
  state: any = initialState,
  action: AnyAction
): IRequestInfo {
  switch (action.type) {
    case 'SET_OBJECT': {
      console.log(action.payload);
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        size: action.payload.size,
        weight: action.payload.weight,
      };
    }
    case 'SET_ID': {
      return {
        ...state,
        id: action.payload,
      };
    }
    case 'SET_UID': {
      return {
        ...state,
        uid: action.payload,
      };
    }
    case 'SET_ADRESS': {
      console.log(state);
      return {
        ...state,
        pickup_adress: action.payload.pickup_adress,
        delivery_adress: action.payload.delivery_adress,
      };
    }
    case 'SET_PRICE': {
      return { ...state, price: action.payload };
    }

    case 'SET_TIME': {
      return { ...state, time: action.payload };
    }

    case 'SET_DATE_RANGE': {
      return { ...state, dateRange: action.payload };
    }

    case 'ADD_IMAGE': {
      return { ...state, images: [...state.images, action.payload] };
    }

    case 'REMOVE_IMAGE': {
      const updatedImages = state.images.filter(
        (_: any, index: number) => index !== action.payload
      );
      return { ...state, images: updatedImages };
    }

    default: {
      console.log('DANS LE REDUCER MAIS PAS DANS LE BON STATE');
      return state;
    }
  }
}
