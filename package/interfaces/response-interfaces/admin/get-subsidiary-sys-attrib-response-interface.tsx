export interface GetSubsidiarySysAttribResponseInterface {
  correct: boolean
  message: string
  errorCode: number
  object: {
    page: number
    size: number
    totalPage: number
    list: ListSubsidiarySysAtribResponseInterface[]
  }
}

interface ListSubsidiarySysAtribResponseInterface {
  id: string
  idCompany: string
  nameCompany: string
  idSubsidiary: number
  nameSubsidiary: string
  name: string
  value: string
  type: string
  typeValue: string
  idUser: string
  nameUser: string
  active: boolean
}
