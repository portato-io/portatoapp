export interface IObjectInfo {
  name: string;
  description: string;
  size: string;
  weight: string;
  price: number;
  pickup_adress: string;
  delivery_adress: string;
  dateRange: string[];
  time: string;
  images: string[];
}

export interface IFirstObjectInfo {
  name: string;
  description: string;
  size: string;
  weight: string;
}

export type ObjectInfoState = {
  object: IObjectInfo;
};

export type ObjectInfoAction = {
  type: string;
  object: IObjectInfo;
};

export type DispatchType = (args: ObjectInfoAction) => ObjectInfoAction;

export interface IRouteInfo {
  id: number;
  departure_adress: string;
  destination_adress: string;
  acceptable_detour: number;
  time: string;
  delivery_capacity: string;
}

export type RouteInfoAction = {
  type: string;
  route: IRouteInfo;
};
