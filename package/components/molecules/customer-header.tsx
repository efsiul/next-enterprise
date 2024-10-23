"use client"

import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React from "react"
import { useTranslation } from "react-i18next"
import Label from "@atoms/label"
import { StyleAtom } from "@atoms/states/style-atom"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"

interface CustomerSummaryProps {
  customer: CustomerListInterface
}

const CustomerHeader: React.FC<CustomerSummaryProps> = ({ customer }) => {
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  return (
    <Box
      sx={{
        mb: 1,
        p: 2,
        boxShadow: 4,
        bgcolor: styles.backgroundColorHeader || "#333",
        color: styles.fontColorTitleHeader || "#FFF",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }}>
          <Label
            htmlFor="customerName"
            text={t("Customer Name").toUpperCase()}
            sx={{ fontWeight: "bold", color: styles.fontColorTitleHeader || "#FFF" }}
          />
          <Label
            htmlFor={"customerNameValue"}
            text={customer ? `${customer.name} ${customer.firstSurname}` : ""}
            sx={{ color: styles.fontColorItem1 || "#FFF", fontSize: "1.1rem" }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Label
            htmlFor="customerDNI"
            text={t("Customer DNI").toUpperCase()}
            sx={{ fontWeight: "bold", color: styles.fontColorTitleHeader || "#FFF" }}
          />
          <Label
            htmlFor={"customerDNIValue"}
            text={customer ? customer.dni : ""}
            sx={{ color: styles.fontColorItem1 || "#FFF", fontSize: "1.1rem" }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Label
            htmlFor="customerEmail"
            text={t("Customer Email").toUpperCase()}
            sx={{ fontWeight: "bold", color: styles.fontColorTitleHeader || "#FFF" }}
          />
          <Label
            htmlFor={"customerEmailValue"}
            text={customer ? customer.mail : ""}
            sx={{ color: styles.fontColorItem1 || "#FFF", fontSize: "1.1rem" }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomerHeader
