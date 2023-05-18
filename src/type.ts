export interface IObjectInfo {
  id: string;
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
  id: string;
  departure_adress: string;
  destination_adress: string;
  acceptable_detour: number;
  time: string[];
  type: string; // recurrent/single
  days: string;
  timeRange: string;
  delivery_capacity: string;
}

export type RouteInfoAction = {
  type: string;
  route: IRouteInfo;
};

export interface IDealInfo {
  id: string;
  request_id: string;
  route_id: string;
  status: string;
}

export type DealInfoAction = {
  type: string;
  route: IDealInfo;
};
