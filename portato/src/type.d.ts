interface IObjecInfo{
    name: string,
    description: string,
    size: string,
    weight: numer
}

type ObjectInfoState = {
    object: IObjecInfo[]
  }

type ObjectInfoAction = {
    type: string
    object: IObjecInfo
  }

  type DispatchType = (args: ObjectInfoAction) => ObjectInfoAction
