export interface IRequestInfo {
  id: string;
  uid: string;
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
  status: string;
  dealId: string;
}

export interface IFirstObjectInfo {
  name: string;
  description: string;
  size: string;
  weight: string;
  status: string;
  dealId: string;
}

export type ObjectInfoState = {
  object: IRequestInfo;
};

export type ObjectInfoAction = {
  type: string;
  object: IRequestInfo;
};

export type DispatchType = (args: ObjectInfoAction) => ObjectInfoAction;

export interface IRouteInfo {
  id: string;
  uid: string;
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
  route: IRouteInfo;
  request: IRequestInfo;
  status: string;
}

export type DealInfoAction = {
  type: string;
  route: IDealInfo;
};
