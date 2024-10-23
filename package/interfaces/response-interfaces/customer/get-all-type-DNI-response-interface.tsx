export interface GetAllTypeDNIResponseInterface {
  correct: boolean
  message: string
  errorCode: number
  object: CustomerDniTypeObjectInterface | null
}

export interface CustomerDniTypeObjectInterface {
  page: number
  size: number
  totalPage: number
  list: CustomerDniTypeInterface[]
}

export interface CustomerDniTypeInterface {
  id: string
  name: string
  alias: string
  longitude: string
  status: boolean
  idMethodValidation: string
  nameMethodValidation: string
  dataType: string | null
  idUser: string
  nameUser: string
}
