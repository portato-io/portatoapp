export interface IObjectInfo{
    name: string,
    description: string,
    size: string,
    weight: number,
    /*price:number,
    pickup_adress:string,
    delivery_adress:string,
    time:string*/

}

export type ObjectInfoState = {
    object: IObjectInfo
  }

export type ObjectInfoAction = {
    type: string
    object: IObjectInfo
  }

export type DispatchType = (args: ObjectInfoAction) => ObjectInfoAction
