"use client"

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleAtom } from "@atoms/states/style-atom"
import { ItemObject } from "@interfaces/response-interfaces/sale/add-products-response-interface"
import { ItemObjectResponseInterface } from "@interfaces/response-interfaces/sale/complete-product-response-interface"

interface SaleSummaryProps {
  products: (ItemObject | null)[]
  productDetails: ItemObjectResponseInterface | null
}

const SaleSummary: React.FC<SaleSummaryProps> = ({ products, productDetails }) => {
  const { t } = useTranslation()
  const [showError, setShowError] = useState(false)
  const [styles] = useAtom(StyleAtom)

  const lastProduct = products && products.length > 0 ? products[products.length - 1] : null

  const calculateTotal = (price: number, taxAmount: number, taxIncluded: boolean) => {
    if (taxIncluded) {
      return price - taxAmount
    } else {
      return price + taxAmount
    }
  }

  useEffect(() => {
    if ((!lastProduct || !lastProduct.description) && !productDetails) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [lastProduct, productDetails])

  if ((!products || products.length === 0) && !productDetails) {
    return (
      <Box
        sx={{
          color: styles.fontColorItem1 || "black",
          borderRadius: "8px",
          boxShadow: 4,
          p: 0.2,
          mb: 0,
          height: "210px",
        }}
      >
        <Typography>{t("msj_no_product_added")}</Typography>
      </Box>
    )
  }

  const description = lastProduct?.description || productDetails?.longDescription || ""
  const regularUnitPrice = lastProduct?.regularUnitPrice || productDetails?.regularUnitPrice || 0
  const totalTaxes = lastProduct?.totalTaxes || productDetails?.totalTaxes || 0

  const taxAmount =
    productDetails?.taxes && Array.isArray(productDetails.taxes)
      ? productDetails.taxes.reduce((acc, tax) => acc + (tax.percent / 100) * regularUnitPrice, 0)
      : 0

  const taxIncluded =
    productDetails?.taxes && Array.isArray(productDetails.taxes)
      ? productDetails.taxes.some((tax) => tax.taxIncluded)
      : false

  const total = productDetails
    ? calculateTotal(regularUnitPrice, taxAmount, taxIncluded)
    : lastProduct?.extendedPrice || 0

  return (
    <Box
      sx={{
        color: styles.fontColorItem1 || "black",
        borderRadius: "8px",
        boxShadow: 4,
        p: 0.2,
        mb: 0,
        height: "210px",
      }}
    >
      <Box sx={{ mb: 0, p: { xs: 0.2, md: 0.2 }, boxShadow: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "60%",
                  color: styles.fontColorTitle || "primary.main",
                  borderColor: "black",
                }}
              >
                {t("tle_product")}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "55%",
                  color: styles.fontColorTitle || "primary.main",
                  borderColor: "black",
                  textAlign: "right",
                }}
              >
                {t("tle_amount")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: styles.fontColorItem1 || "black", borderColor: "black" }}>
                {description}
              </TableCell>
              <TableCell
                sx={{
                  color: styles.fontColorItem1 || "black",
                  borderColor: "black",
                  textAlign: "right",
                }}
              >
                1
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Grid container justifyContent="flex-end" spacing={0.5} sx={{ mt: 0.5 }}>
          <Box sx={{ mt: 0.5, textAlign: "right" }}>
            <Grid container>
              <Grid size={{ xs: 6, sm: 7 }} sx={{ pr: 10 }}>
                <Typography
                  variant="body2"
                  align="right"
                  fontWeight="bold"
                  sx={{ color: styles.fontColorLabel || "black" }}
                >
                  {t("lbl_subtotal")}:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 5 }}>
                <Typography variant="body2" align="left">
                  {regularUnitPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid size={{ xs: 6, sm: 7 }} sx={{ pr: 7 }}>
                <Typography
                  variant="body2"
                  align="right"
                  fontWeight="bold"
                  sx={{ color: styles.fontColorLabel || "black" }}
                >
                  {t("lbl_tax")}:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 5 }}>
                <Typography variant="body2" align="left">
                  {totalTaxes ? totalTaxes.toFixed(2) : taxAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>

      {showError && (
        <Box sx={{ p: 1, backgroundColor: "error.main", color: "white", borderRadius: "5px", mt: 2 }}>
          <Typography variant="body2">{t("msj_product_not_found")}</Typography>
        </Box>
      )}

      <Box
        sx={{
          p: 1.5,
          boxShadow: 5,
          backgroundColor: styles.backgroundColorSecondaryButton || "grey.800",
          color: styles.fontColorTotals1 || "white",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: styles.fontColorTotals1 || "white",
          }}
        >
          <span>{t("tle_total")}:</span>
          <span>{total.toFixed(2)}</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default SaleSummary
