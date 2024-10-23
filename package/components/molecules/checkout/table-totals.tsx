"use client"

import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyleAtom } from "@atoms/states/style-atom"
import { SaleTransactionObjectInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import CustomCard from "@molecules/custom-card"

interface TotalsTableProps {
  products: SaleTransactionObjectInterface | null
}

const TotalsTable: React.FC<TotalsTableProps> = ({ products }) => {
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  return (
    <Box
      sx={{
        p: 1,
        boxShadow: styles.boxShadow || 4,
        width: "100%",
        maxWidth: { xs: "100%", md: "100%" },
        mx: "auto",
        backgroundColor: "#9b9b9b",
        borderRadius: "8px",
      }}
    >
      <CustomCard sx={{ backgroundColor: "#2c3e50", color: "#FFFFFF", p: 2, borderRadius: "8px" }}>
        <Table
          sx={{
            minWidth: 320,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: styles.fontColorTitleHeader || "RGB(255,255,255)",
                  fontWeight: "bold",
                  width: { xs: "25%", md: "20%" },
                  fontSize: styles.fontSizeTotals1 || "1rem",
                }}
              >
                {t("tle_total_unit")}
              </TableCell>
              <TableCell
                sx={{
                  color: styles.fontColorTitleHeader || "RGB(255,255,255)",
                  fontWeight: "bold",
                  width: { xs: "25%", md: "20%" },
                  fontSize: styles.fontSizeTotals1 || "1rem",
                }}
              >
                {t("tle_total_taxes")}
              </TableCell>
              <TableCell
                sx={{
                  color: styles.fontColorTitleHeader,
                  fontWeight: "bold",
                  width: { xs: "25%", md: "20%" },
                  fontSize: styles.fontSizeTotals1 || "1rem",
                }}
              >
                {t("tle_total_discount")}
              </TableCell>
              <TableCell
                sx={{
                  color: styles.fontColorTitleHeader,
                  fontWeight: "bold",
                  width: { xs: "25%", md: "20%" },
                  fontSize: styles.fontSizeTotals1 || "1rem",
                }}
              >
                {t("tle_total")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: styles.backgroundColorSecondaryButton }}>
                ${products?.totalSale?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: styles.backgroundColorSecondaryButton }}>
                ${products?.totalTaxes?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: styles.backgroundColorSecondaryButton }}>
                $0.00 {/* Descuento total si aplica */}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: styles.backgroundColorSecondaryButton }}>
                ${((products?.totalWithPromotion ?? 0) + (products?.totalTaxes ?? 0)).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CustomCard>
    </Box>
  )
}

export default TotalsTable
