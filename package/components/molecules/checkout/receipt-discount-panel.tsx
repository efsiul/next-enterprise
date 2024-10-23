import DiscountIcon from "@mui/icons-material/Discount"
import PercentIcon from "@mui/icons-material/Percent"
import ReceiptIcon from "@mui/icons-material/Receipt"
import RedeemIcon from "@mui/icons-material/Redeem"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"

import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { Tooltip } from "@atoms/tooltip"

const ReceiptAndDiscountPanel: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_add_receipt")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_add_receipt")} variant="primary" startIcon={<ReceiptIcon />} />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_manage_coupons")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_coupons")} variant="primary" startIcon={<RedeemIcon />} />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_discount_percentage")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_discount_percentage")} variant="secondary" startIcon={<PercentIcon />} />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_amount_discount")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_amount_discount")} variant="secondary" startIcon={<DiscountIcon />} />
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default ReceiptAndDiscountPanel
