"use client"
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { GetAllStore } from "@api/admin/store/get-all-store/page"
import CompleteProduct from "@api/sale/products/complete-product/page"
import EndSale from "@api/sale/transaction/end-sale/page"
import GetSale from "@api/sale/transaction/get-sale/page"
import Button from "@atoms/button"
import CustomLoader from "@atoms/custom-loading"
import { storeNumberAtom, storePosAtom } from "@atoms/states/store-atom"
import { GetAllStoreOutputInterface } from "@interfaces/output-Interfaces/admin/get-all-store-output-interface"
import { CompleteProductOutputInterface } from "@interfaces/output-Interfaces/sale/complete-product-output-interface"
import { EndSaleOutputInterface } from "@interfaces/output-Interfaces/sale/end-sale-output-interface"
import { GetSaleOutputInterface } from "@interfaces/output-Interfaces/sale/get-sale-output-interface"
import {
  GetAllStoreResponseInterface,
  StoreDTOInterface,
} from "@interfaces/response-interfaces/admin/get-all-store-response-interface"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import {
  CompleteProductResponseInterface,
  ItemObjectResponseInterface,
} from "@interfaces/response-interfaces/sale/complete-product-response-interface"
import { EndSaleResponseInterface } from "@interfaces/response-interfaces/sale/end-sale-response-interface"
import {
  GetSaleResponseInterface,
  SaleTransactionObjectInterface,
} from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"
import PrintReceipt from "@molecules/checkout/print-receipt"
import ClientSearch from "@organisms/checkout/client-search"
import ComponentSelector from "@organisms/checkout/component-selector"
import ControlPanel from "@organisms/checkout/control-panel"
import ProductTable from "@organisms/checkout/product-table"
import ReceiptDialog from "@organisms/checkout/receipt-dialog"
import { getUser } from "@utils/utilities"

const CheckoutLayout: React.FC = () => {
  const [transaction, setTransaction] = useState<StartSaleResponseInterface | null>(null)
  const [client, setClient] = useState<CustomerListInterface | null>(null)
  const [productsList, setProductsList] = useState<SaleTransactionObjectInterface | null>(null)
  const [productDetails, setProductDetails] = useState<ItemObjectResponseInterface | null>(null)
  const [receiptProductsList, setReceiptProductsList] = useState<SaleTransactionObjectInterface | null>(null)
  const [endSaleResponse, setEndSaleResponse] = useState<EndSaleResponseInterface | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openReceipt, setOpenReceipt] = useState(false)
  const [loading, setLoading] = useState(false)
  const [infoStore, setInfoStore] = useState<StoreDTOInterface[]>([])
  const [SKU, setSKU] = useState<string>("")

  const [idUser] = useState(getUser() && getUser().id ? getUser().id : "")
  const { t } = useTranslation()

  const [storeNumber] = useAtom(storeNumberAtom)
  const [storePos] = useAtom(storePosAtom)

  const fetchInfoStore = useCallback(async () => {
    setLoading(true)

    try {
      const getStoreRequest: GetAllStoreOutputInterface = {
        id: "",
        name: "",
        numberStore: storeNumber!,
        idCompany: "",
        idSubsidiary: 0,
        state: null,
        size: 10,
        page: 0,
      }

      const productResponse = (await GetAllStore(getStoreRequest)) as GetAllStoreResponseInterface

      if (productResponse.object === null) {
        console.error(t("msj_product_is_not_registered_our_system"))
      } else {
        setInfoStore(productResponse.object.storeDTOList)
      }
    } catch (error) {
      console.error(t("msj_error_during_product_search"), error)
    } finally {
      setLoading(false)
    }
  }, [storeNumber, t])

  useEffect(() => {
    fetchInfoStore()
  }, [fetchInfoStore])

  const handleTransactionComplete = (transaction: StartSaleResponseInterface, client: CustomerListInterface) => {
    setTransaction(transaction)
    setClient(client)
  }

  const handleProductSearch = async () => {
    if (!SKU) {
      console.error("SKU is empty, search cannot be performed.")
      return
    }

    const request: CompleteProductOutputInterface = {
      idSubsidiary: client?.idSubsidiary ?? 0,
      sku: SKU,
    }

    try {
      setLoading(true)
      const productResponse = (await CompleteProduct(request)) as CompleteProductResponseInterface
      if (productResponse && productResponse.correct) {
        setProductDetails(productResponse.object)
      } else {
        console.error("Error fetching product: ", productResponse?.message)
      }
    } catch (error) {
      console.error("Error fetching product: ", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSaleDetails = useCallback(async () => {
    if (!transaction || !client) return

    try {
      const saleRequest: GetSaleOutputInterface = {
        idTransaction: transaction.object?.id,
        storeNumber: storeNumber,
        idSubsidiary: client.idSubsidiary,
        idUser: client.idUser,
        pos: storePos,
      }

      const saleResponse = (await GetSale(saleRequest)) as GetSaleResponseInterface

      if (saleResponse && saleResponse.correct) {
        setProductsList(saleResponse.object)
      } else {
        console.error("Error fetching sale details: ", saleResponse?.message)
      }
    } catch (error) {
      console.error("Error during GetSale API call", error)
    }
  }, [client, storeNumber, storePos, transaction])

  useEffect(() => {
    fetchSaleDetails()
  }, [fetchSaleDetails, transaction])

  const handleProductAdded = () => {
    if (transaction && transaction.object?.id) {
      fetchSaleDetails()
    } else {
      console.error("The transaction cannot be modified, is already closed or does not exist")
    }
  }

  const handleEndSale = async () => {
    if (!transaction || !client || !productsList) return

    if (!transaction.object?.id) {
      console.error("Transaction ID is missing")
      return
    }

    if (client.idSubsidiary === undefined) {
      console.error("Client subsidiary ID is missing")
      return
    }

    const storeAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS || ""
    const codeMunPos = process.env.NEXT_PUBLIC_STORE_CODE_CITY || ""
    const nameMunPos = process.env.NEXT_PUBLIC_STORE_CITY || ""
    const codeDepPos = process.env.NEXT_PUBLIC_STORE_CODE_DEPARTMENT || ""
    const nameDepPos = process.env.NEXT_PUBLIC_STORE_DEPARTMENT || ""

    if (!storeAddress || !codeMunPos || !nameMunPos || !codeDepPos || !nameDepPos) {
      console.error("Missing store address information from environment variables")
      return
    }

    const endSaleRequest: EndSaleOutputInterface = {
      idTransaction: transaction.object.id,
      storeNumber: storeNumber,
      idSubsidiary: client.idSubsidiary,
      idUser: idUser,
      localDate: new Date().toISOString(),
      pos: storePos,
      comment: "Test End Sale",
      payment: [
        {
          type: "CASH",
          approvalCode: "0001",
          receiptNumber: "10001",
          value: productsList.totalWithPromotion + productsList.totalTaxes,
          cardNumber: "0032",
          cardType: "DEBIT",
          comment: "Test",
        },
      ],
      infoPos: {
        addressPos: storeAddress,
        codeMunPos: codeMunPos,
        nameMunPos: nameMunPos,
        codeDepPos: codeDepPos,
        nameDepPos: nameDepPos,
        pos: storePos,
      },
    }
    try {
      const endSaleResponse = (await EndSale(endSaleRequest)) as EndSaleResponseInterface

      if (endSaleResponse && endSaleResponse.correct) {
        setEndSaleResponse(endSaleResponse)
        setReceiptProductsList(productsList)
        setProductsList(null)
        setOpenReceipt(true)
        setOpenDialog(true)
        setProductDetails(null)
      } else {
        console.error("Error ending sale:", endSaleResponse?.message)
      }
    } catch (error) {
      console.error("Error during EndSale API call", error)
    }
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setTransaction(null)
    setClient(null)
    setProductsList(null)
    setReceiptProductsList(null)
    setEndSaleResponse(null)
    setOpenReceipt(false)
  }

  const posType = process.env.NEXT_PUBLIC_TYPE_POS

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        bgcolor: "background.default",
        boxShadow: "4",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Container maxWidth={false} sx={{ flexGrow: 1, py: 0, overflow: "auto" }}>
        <Grid container spacing={1} direction={{ xs: "column-reverse", md: "row" }} alignItems="stretch">
          {loading ? (
            <Grid
              size={{ xs: 12, md: 12 }}
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
            >
              <CustomLoader />
            </Grid>
          ) : (
            <>
              <Grid size={{ xs: 12, md: 4 }} order={{ xs: 3, md: 3 }}>
                <Paper elevation={3} sx={{ height: "100%", p: { xs: 1, md: 2 } }}>
                  <Grid size={{ xs: 12, md: 12 }} sx={{ height: "100%" }}>
                    {!transaction && !client ? (
                      <ClientSearch onTransactionComplete={handleTransactionComplete} />
                    ) : (
                      <ControlPanel
                        setSKU={setSKU}
                        SKU={SKU}
                        setProductDetails={setProductDetails}
                        productDetails={productDetails!}
                        transaction={transaction!}
                        client={client!}
                        onProductAdded={handleProductAdded}
                        onEndSale={handleEndSale}
                      />
                    )}
                  </Grid>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }} order={{ xs: 2, md: 2 }} justifyContent="center" alignItems="center">
                <Paper elevation={5} sx={{ height: "100vh", p: { xs: 1, md: 1 } }}>
                  <Grid size={{ xs: 12, md: 12 }} sx={{ height: "100vh" }}>
                    <ComponentSelector onSearchProduct={handleProductSearch} />
                  </Grid>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 1 }}>
                <Paper elevation={3} sx={{ height: "100%", p: { xs: 1, md: 1 } }}>
                  <Grid size={{ xs: 12, md: 12 }} sx={{ height: "100%" }}>
                    <ProductTable products={productsList} customer={client!} />
                  </Grid>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{t("lbl_transaction_complete")}</DialogTitle>
        <DialogContent id="dialog-description" inert={openDialog ? undefined : true}>
          <DialogContentText>{endSaleResponse?.correct || t("lbl_erroneous_transaction")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} label={t("lbl_accept")} />
        </DialogActions>
      </Dialog>

      {transaction && posType === "PV" && (
        <ReceiptDialog
          open={openReceipt}
          onClose={() => setOpenReceipt(false)}
          client={client}
          transactionDetails={receiptProductsList}
          transaction={transaction}
          responseTransaction={endSaleResponse!}
          storeInfo={infoStore}
        />
      )}

      {transaction && posType === "SCO" && (
        <PrintReceipt
          client={client}
          transactionDetails={receiptProductsList}
          transaction={transaction}
          responseTransaction={endSaleResponse!}
          storeInfo={infoStore}
          onClose={() => setOpenReceipt(false)}
        />
      )}
    </Box>
  )
}

export default CheckoutLayout
