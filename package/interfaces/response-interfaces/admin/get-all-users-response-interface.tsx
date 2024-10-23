export interface UserDTOInterface {
  id: string
  idSubsidiary: number
  subsidiaryName: string
  idCompany: string
  companyName: string
  name: string
  lastName: string
  email: string
  cellphone: string
  password: string
  idTypeUser: string
  typeName: string
  idUser: string | null
  isActive: boolean
  isAdmin: boolean
}

export interface ObjectDetailsUserInterface {
  page: number
  size: number
  totalPage: number
  userDTOList: UserDTOInterface[]
}

export interface GetUsersAllResponseInterface {
  correct: boolean
  message: string
  errorCode: number
  object: ObjectDetailsUserInterface | null
}
