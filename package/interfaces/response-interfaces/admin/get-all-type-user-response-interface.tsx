export interface TypeUserDTOInterface {
  id: string
  name: string
  isActive: boolean
  idUser: string
  idSubsidiary: number
  nameSubsidiary: string
  nameUser: string
  idCompany: string
  nameCompany: string
}

export interface ObjectDetailsTypeuserInterface {
  page: number
  size: number
  totalPage: number
  typeUserDTOList: TypeUserDTOInterface[]
}

export interface GetAllTypeUserResponseInterface {
  correct: boolean
  message: string
  errorCode: number
  object: ObjectDetailsTypeuserInterface | null
}
