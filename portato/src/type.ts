export interface IObjectInfo{
    name: string,
    description: string,
    size: string,
    weight: string,
    price:number,
    pickup_adress:string,
    delivery_adress:string,
    dateRange:string[],
    time:string,
    images:string[]
}

export interface IFirstObjectInfo{
    name: string,
    description: string,
    size: string,
    weight: string,
}

export type ObjectInfoState = {
    object: IObjectInfo
  }

export type ObjectInfoAction = {
    type: string
    object: IObjectInfo
  }

export type DispatchType = (args: ObjectInfoAction) => ObjectInfoAction
