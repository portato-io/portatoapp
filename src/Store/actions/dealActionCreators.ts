import * as actionTypes from '../actionTypes/dealActionTypes';
import { AnyAction } from 'redux';

export const setDealId = (id: string): AnyAction => ({
  type: actionTypes.SET_ID,
  payload: { id },
});
