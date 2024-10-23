"use client"

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import Grid2 from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { storeNumberAtom, storePosAtom } from "@atoms/states/store-atom"
import { AddProductsOutputInterface } from "@interfaces/output-Interfaces/sale/add-products-output-interface"
import { RemoveProductsOutputInterface } from "@interfaces/output-Interfaces/sale/remove-products-output-interface"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import {
  AddProductsResponseInterface,
  ItemObject,
} from "@interfaces/response-interfaces/sale/add-products-response-interface"
import { ItemObjectResponseInterface } from "@interfaces/response-interfaces/sale/complete-product-response-interface"
import { RemoveProductsResponseInterface } from "@interfaces/response-interfaces/sale/remove-products-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"
import ProductSearch from "@molecules/checkout/product-search"
import SaleSummary from "@molecules/checkout/sale-summary"
import AddProducts from "@api/sale/transaction/add-products/page"
import RemoveProducts from "@api/sale/transaction/remove-products/page"

interface ControlPanelProps {
  productDetails: ItemObjectResponseInterface
  setProductDetails: (productDetails: ItemObjectResponseInterface | null) => void
  transaction: StartSaleResponseInterface
  client: CustomerListInterface
  onProductAdded: (product: ItemObject[]) => void
  onEndSale: () => void
  setSKU: (sku: string) => void
  SKU: string
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  productDetails,
  setProductDetails,
  transaction,
  client,
  onProductAdded,
  onEndSale,
  setSKU,
  SKU,
}) => {
  const [loading, setLoading] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [lastProduct, setLastProduct] = useState<ItemObject | null>(null)
  const [addedProducts, setAddedProducts] = useState<ItemObject[]>([])
  const [storeNumber] = useAtom(storeNumberAtom)
  const [storePos] = useAtom(storePosAtom)
  const { t } = useTranslation()

  const handleAddSKU = async () => {
    setLoading(true)
    console.log("SKU", SKU)
    try {
      const addProductRequest: AddProductsOutputInterface = {
        idTransaction: transaction.object?.id,
        storeNumber: storeNumber,
        idSubsidiary: client.idSubsidiary,
        clientNit: client.dni,
        idUser: client.idUser,
        localDate: new Date(),
        pos: storePos,
        products: [
          {
            sku: SKU,
            value: 1,
          },
        ],
      }

      const productResponse = (await AddProducts(addProductRequest)) as AddProductsResponseInterface

      if (productResponse.object === null) {
        setErrorMessage(t("msj_product_is_not_registered_our_system"))
        setErrorDialogOpen(true)
      } else {
        setLastProduct(productResponse.object)
        const updatedProducts = lastProduct ? [...addedProducts, lastProduct] : addedProducts
        setAddedProducts(updatedProducts)
        onProductAdded(updatedProducts)
        setLastProduct(null)
        setProductDetails(null)
      }
    } catch (error) {
      setErrorMessage(t("msj_error_during_product_search"))
      setErrorDialogOpen(true)
      console.error(t("msj_error_during_AddProducts_API_call"), error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseDialog = () => {
    setErrorDialogOpen(false)
  }

  return (
    <>
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">Loading...</Typography>
            </Box>
          ) : (
            <SaleSummary
              products={lastProduct ? [lastProduct] : []}
              productDetails={productDetails || ({} as ItemObjectResponseInterface)}
            />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <ProductSearch onEndSale={onEndSale} onAdd={handleAddSKU} setSKU={setSKU} />
        </Grid2>
      </Grid2>

      <Dialog open={errorDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t("msj_product_not_found")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="primary" label={t("lbl_accept")} />
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ControlPanel
