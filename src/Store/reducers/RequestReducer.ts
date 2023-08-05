import { AnyAction } from 'redux';
import { IRequestInfo } from '../../type';

const initialState: IRequestInfo = {
  id: '0',
  uid: '0',
  name: '',
  description: '',
  size: '',
  weight: '',
  price: 10,
  pickup_adress: '',
  delivery_adress: '',
  dateRange: ['', ''],
  time: '',
  images: [],
  status: 'unmatched',
  dealId: '',
  contactTimestamp: '',
};

export function requestReducer(
  state: IRequestInfo = initialState,
  action: AnyAction
): IRequestInfo {
  console.log(action.type);
  switch (action.type) {
    case 'SET_OBJECT': {
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        size: action.payload.size,
        weight: action.payload.weight,
        status: action.payload.status || false,
        dealId: action.payload.dealId || '',
        contactTimestamp: action.payload.contactTimestamp || '',
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
    case 'SET_REQ_PICKUP_ADDRESS': {
      return {
        ...state,
        pickup_adress: action.payload,
      };
    }
    case 'SET_REQ_DELIVERY_ADDRESS': {
      return {
        ...state,
        delivery_adress: action.payload,
      };
    }
    case 'SET_PRICE': {
      return { ...state, price: action.payload };
    }

    case 'SET_TIME': {
      return { ...state, time: action.payload };
    }

    case 'SET_STATUS': {
      return { ...state, status: action.payload };
    }

    case 'SET_DATE_RANGE': {
      return { ...state, dateRange: action.payload };
    }

    case 'ADD_IMAGE': {
      return { ...state, images: [...state.images, action.payload] };
    }

    case 'REMOVE_IMAGE': {
      const updatedImages = state.images.filter(
        (image: unknown, index: number) => index !== action.payload
      );
      return { ...state, images: updatedImages };
    }
    case 'SET_DEAL_ID': {
      return { ...state, dealId: action.payload };
    }

    case 'SET_REQUEST': {
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        size: action.payload.size,
        weight: action.payload.weight,
        status: action.payload.status || false,
        dealId: action.payload.dealId || '',
        contactTimestamp: action.payload.contactTimestamp || '',
        id: action.payload.id,
        uid: action.payload.uid,
        price: action.payload.price,
        pickup_adress: action.payload.pickup_adress,
        delivery_adress: action.payload.delivery_adress,
        dateRange: action.payload.dateRange,
        time: action.payload.time,
        images: action.payload.images,
      };
    }

    case 'REMOVE_URLS_FROM_IMAGES':
      return {
        ...state,
        images: state.images.filter(
          (innerArray) => !innerArray.includes(action.payload)
        ),
      };

    case 'EMPTY_STATE':
      return initialState;

    default: {
      return state;
    }
  }
}
