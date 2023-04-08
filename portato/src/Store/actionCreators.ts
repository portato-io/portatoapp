import * as actionTypes from "./actionTypes"

export function addArticle(object: IObjecInfo) {
  const action: ObjectInfoAction = {
    type: actionTypes.ADD_OBJECT,
    object,
  }

}
