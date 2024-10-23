"use client"

import Box from "@mui/material/Box"
import { Printer } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import React, { useRef } from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { StoreDTOInterface } from "@interfaces/response-interfaces/admin/get-all-store-response-interface"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import { EndSaleResponseInterface } from "@interfaces/response-interfaces/sale/end-sale-response-interface"
import { SaleTransactionObjectInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"

interface PrintReceiptProps {
  client: CustomerListInterface | null
  transactionDetails: SaleTransactionObjectInterface | null
  transaction: StartSaleResponseInterface
  responseTransaction?: EndSaleResponseInterface
  storeInfo: StoreDTOInterface[]
  onClose: () => void
}

const PrintReceipt: React.FC<PrintReceiptProps> = ({
  client,
  transactionDetails,
  transaction,
  responseTransaction,
  storeInfo,
  onClose,
}) => {
  const { t } = useTranslation()
  const qrRef = useRef<HTMLCanvasElement>(null)

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

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const store = storeInfo[0]
    const qrCodeDataURL = qrRef.current?.toDataURL("image/png") || ""

    const groupedProducts = transactionDetails?.list ? groupProductsByName(transactionDetails.list) : []

    const printContent = `
    <html>
      <head>
        <title>${t("tle_purchase_slip")}</title>
        <style>
          @page {
            size: 80mm auto;
            margin: 1;
          }
          body {
            font-family: Arial, sans-serif;
            width: 80mm;
            padding: 0;
            margin: 0;
            font-size: 12px;
          }
          .header, .footer {
            text-align: center;
          }
          .product-list {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            margin: 5mm 0;
          }
          .product-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
            align-items: center;
          }
          .description {
            width: 60%;
            word-wrap: break-word;
            overflow: hidden;
          }
          .quantity {
            text-align: center;
            width: 15%;
          }
          .price {
            width: 25%;
            text-align: right;
          }
          .totals {
            text-align: right;
            margin-top: 5mm;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <p><strong>${store?.nameSubsidiary}</strong></p>
          <p>${t("lbl_payment_box")}: ${store?.numberStore || "N/A"}   -   ${t("lbl_cashier")}: 2222</p>
          <p>${t("lbl_date")}: ${new Date().toLocaleDateString()} ${t(
            "lbl_hour"
          )}: ${new Date().toLocaleTimeString()}</p>
          <p>${t("lbl_cash_receipt")}: ${transaction.object?.transactionNumber || "N/A"}</p>
          <p>${t("lbl_sirs")}: ${client?.NameSurname || t("lbl_end_customer")}</p>
        </div>

        <div class="product-list">
          <div style="font-weight: bold; display: flex; justify-content: space-between;">
            <span>${t("lbl_description")}</span>
            <span class="quantity">${t("lbl_quantity")}</span>
            <span class="price">${t("lbl_price")}</span>
          </div>
          ${groupedProducts
            .map(
              (product) => `
            <div class="product-item">
              <span class="description">${product.name}</span>
              <span class="quantity">${product.quantity}</span>
              <span class="price">$${product.extendedPrice.toFixed(2)}</span>
            </div>`
            )
            .join("")}
        </div>

        <div class="totals">
          <p>Subtotal: $${transactionDetails?.totalSale?.toFixed(2)}</p>
          <p>IVA: $${transactionDetails?.totalTaxes?.toFixed(2)}</p>
          <p>Total: $${transactionDetails?.totalWithPromotion?.toFixed(2)}</p>
        </div>

        <div class="footer">
          <p>CUFE: ${responseTransaction?.object?.cufe || "N/A"}</p>

          <p>${t("msj_check_your_invoice_in_the_following_QR_code")}</p>
          <img src="${qrCodeDataURL}" alt="QR Code"/>
          <p>${t("msj_thank_you_purchase")}</p>
        </div>
      </body>
    </html>
    `

    printWindow.document.open()
    printWindow.document.write(printContent)
    printWindow.document.close()

    printWindow.onload = () => {
      printWindow.print()
      printWindow.onafterprint = () => printWindow.close()
    }
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <>
        {responseTransaction?.object?.QRCode && (
          <Box sx={{ mb: 2 }}>
            <QRCodeCanvas value={responseTransaction.object.QRCode} size={128} ref={qrRef} />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Button
            onClick={handlePrint}
            variant="primary"
            startIcon={<Printer size={20} />}
            label={t("lbl_print")}
            sx={{ flex: 1 }}
          />
          <Button onClick={onClose} variant="primary" label={t("lbl_close")} sx={{ flex: 1 }} />
        </Box>
      </>
    </Box>
  )
}

export default PrintReceipt
