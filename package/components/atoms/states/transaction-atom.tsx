import { atom } from "jotai"
import { SaleTransactionObjectInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"

export const transactionAtom = atom<StartSaleResponseInterface | null>(null)

export const productsAtom = atom<SaleTransactionObjectInterface | null>(null)

export const totalAtom = atom<number>(0)
