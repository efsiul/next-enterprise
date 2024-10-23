"use client"

import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { StoreDTOInterface } from "@interfaces/response-interfaces/admin/get-all-store-response-interface"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import { EndSaleResponseInterface } from "@interfaces/response-interfaces/sale/end-sale-response-interface"
import { SaleTransactionObjectInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"
import PrintReceipt from "@molecules/checkout/print-receipt"

interface ReceiptDialogProps {
  open: boolean
  onClose: () => void
  client: CustomerListInterface | null
  transactionDetails: SaleTransactionObjectInterface | null
  transaction: StartSaleResponseInterface
  responseTransaction?: EndSaleResponseInterface
  storeInfo: StoreDTOInterface[]
}

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  client,
  transactionDetails,
  transaction,
  responseTransaction,
  storeInfo,
}) => {
  const { t } = useTranslation()

  const groupProductsByName = (productsList: SaleTransactionObjectInterface["list"]) => {
    return productsList.reduce(
      (acc, product) => {
        const existingProduct = acc.find((p) => p.name === product.name)
        if (existingProduct) {
          existingProduct.quantity += product.quantity ?? 0
          existingProduct.extendedPrice += product.extendedPrice ?? 0
        } else {
          acc.push({
            name: product.name,
            quantity: product.quantity ?? 0,
            extendedPrice: product.extendedPrice ?? 0,
          })
        }
        return acc
      },
      [] as { name: string; quantity: number; extendedPrice: number }[]
    )
  }

  const groupedProducts = transactionDetails?.list ? groupProductsByName(transactionDetails.list) : []

  const store = storeInfo[0]

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t("tle_purchase_slip")}</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h6">
              <strong>{store?.nameSubsidiary}</strong>
            </Typography>
            <Typography>{`${t("lbl_payment_box")}: ${store?.numberStore || "N/A"} - ${t(
              "lbl_cashier"
            )}: 2222`}</Typography>
            <Typography>{`${t("lbl_date")}: ${new Date().toLocaleDateString()} ${t(
              "lbl_hour"
            )}: ${new Date().toLocaleTimeString()}`}</Typography>
            <Typography>{`${t("lbl_cash_receipt")}: ${transaction.object?.transactionNumber || "N/A"}`}</Typography>
            <Typography>
              <strong>{t("lbl_customer")}:</strong> {client ? `${client.name} ${client.firstSurname}` : "Anónimo"}
            </Typography>
            <Typography>
              <strong>DNI:</strong> {client?.dni || "-"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {client?.mail || "-"}
            </Typography>
          </Box>

          {/* Product list */}
          <Box sx={{ borderTop: "1px dashed #000", borderBottom: "1px dashed #000", padding: "10px 0", mb: 2 }}>
            <Box sx={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
              <span>{t("lbl_description")}</span>
              <span>{t("lbl_quantity")}</span>
              <span>{t("lbl_price")}</span>
            </Box>
            {groupedProducts.length ? (
              groupedProducts.map((product, index) => (
                <Box key={index} sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                  <Typography sx={{ width: "60%", wordWrap: "break-word" }}>{product.name}</Typography>
                  <Typography sx={{ width: "15%", textAlign: "center" }}>{product.quantity}</Typography>
                  <Typography sx={{ width: "25%", textAlign: "right" }}>{`$${product.extendedPrice.toFixed(
                    2
                  )}`}</Typography>
                </Box>
              ))
            ) : (
              <Typography>{t("msj_no_products_added")}</Typography>
            )}
          </Box>

          {/* Totals */}
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography>
              <strong>{t("lbl_subtotal")}:</strong> ${transactionDetails?.totalSale?.toFixed(2) || "0.00"}
            </Typography>
            <Typography>
              <strong>{t("lbl_taxes")}:</strong> ${transactionDetails?.totalTaxes?.toFixed(2) || "0.00"}
            </Typography>
            <Typography>
              <strong>{t("lbl_total")}:</strong> ${transactionDetails?.totalWithPromotion?.toFixed(2) || "0.00"}
            </Typography>
            <Typography>
              <strong>{t("lbl_code_cufe")}:</strong> {responseTransaction?.object?.cufe || "N/A"}
            </Typography>
          </Box>

          {/* QR Code */}
          {responseTransaction?.object?.QRCode && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography>{t("msj_check_your_invoice_in_the_following_QR_code")}</Typography>
              <PrintReceipt
                client={client}
                transactionDetails={transactionDetails}
                transaction={transaction}
                responseTransaction={responseTransaction!}
                storeInfo={storeInfo}
                onClose={onClose}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialog
