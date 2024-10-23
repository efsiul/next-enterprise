"use client"
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleAtom } from "@atoms/states/style-atom"
import Title from "@atoms/title"
import FeeAndBagManagementPanel from "@molecules/checkout/fee-bag-management-panel"
import GenericActionsPanel from "@molecules/checkout/generic-actions-panel"
import OrderManagementPanel from "@molecules/checkout/order-management-panel"
import ReceiptAndDiscountPanel from "@molecules/checkout/receipt-discount-panel"
import TaxAndInquiryPanel from "@molecules/checkout/tax-inquiry-panel"

interface ComponentSelectorProps {
  onSearchProduct: () => void
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ onSearchProduct }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("orderManagement")
  const { t } = useTranslation()

  const [styles] = useAtom(StyleAtom)

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedComponent(event.target.value)
  }

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "orderManagement":
        return <OrderManagementPanel onSearch={onSearchProduct} />
      case "receiptAndDiscount":
        return <ReceiptAndDiscountPanel />
      case "feeAndBag":
        return <FeeAndBagManagementPanel />
      case "taxAndInquiry":
        return <TaxAndInquiryPanel />
      case "genericActions":
        return <GenericActionsPanel />
      default:
        return null
    }
  }

  return (
    <Grid container spacing={1} columns={{ xs: 12, sm: 12, md: 12 }} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12, sm: 12 }}>
        <Title text={t("lbl_functions")} size="h4" sx={{ color: styles.fontColorTitle || "#000" }} />
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: 0,
          mb: { xs: 0, md: 0 },
          width: { xs: "40%", sm: "60%", md: "100%" },
        }}
      >
        <Select
          value={selectedComponent}
          onChange={handleSelectChange}
          displayEmpty
          fullWidth
          className="w-full self-center rounded border p-2"
          sx={{
            backgroundColor: "#f1f1f1",
            color: styles.fontColorTotals1 || "#000",
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          <MenuItem value="orderManagement">{t("lbl_order_management")}</MenuItem>
          <MenuItem value="receiptAndDiscount">{t("lbl_receipt_discounts")}</MenuItem>
          <MenuItem value="feeAndBag">{t("lbl_fee_bag")}</MenuItem>
          <MenuItem value="taxAndInquiry">{t("lbl_tax_inquiry")}</MenuItem>
          <MenuItem value="genericActions">{t("lbl_generic_actions")}</MenuItem>
        </Select>
      </Grid>

      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "100%", md: "100%" },
          mt: 2,
          p: { xs: 1, md: 1 },
          backgroundColor: "#fff",
          overflowX: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderSelectedComponent()}
      </Box>
    </Grid>
  )
}

export default ComponentSelector
