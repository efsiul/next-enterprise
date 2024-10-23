export interface TaxResponseInterface {
  id: string
  idSaleDetail: string | null
  idProduct: string
  idTax: string
  name: string
  alias: string
  percent: number
  totalPriceBeforeTaxes: number | null
  taxValue: number | null
  taxUnitValue: number | null
  taxIncluded: boolean
}

export interface ItemObjectResponseInterface {
  id: string
  itemIdentifier: string
  regularUnitPrice: number
  totalTaxes: number | null
  extendedPrice: number
  name: string
  idDepartment: string | null
  departmentNumber: string | null
  description: string
  longDescription: string
  quantity: number | null
  restrictedAge: number
  taxableFlag: boolean
  weight: number | null
  taxes: TaxResponseInterface[]
  weighable: boolean
}

export interface CompleteProductResponseInterface {
  correct: boolean
  message: string
  errorCode: number
  object: ItemObjectResponseInterface | null
}
