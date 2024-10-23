export interface Product {
  sku: string
  value: number
}

export interface RemoveProductsOutputInterface {
  idTransaction: string
  storeNumber: string
  idSubsidiary: number
  clientNit: string
  idUser: string
  localDate: Date
  pos: string
  products: Product[]
}
