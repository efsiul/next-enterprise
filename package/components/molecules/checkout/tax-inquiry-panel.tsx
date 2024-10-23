import CreditCardIcon from "@mui/icons-material/CreditCard"
import SearchIcon from "@mui/icons-material/Search"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React from "react"

import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { Tooltip } from "@atoms/tooltip"

const TaxAndInquiryPanel: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_tax_exempt")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_tax_exempt")} variant="primary" startIcon={<CreditCardIcon />} />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_clear_exempt")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_clear_exempt")} variant="primary" startIcon={<CreditCardIcon />} />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_item_inquiry")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_item_inquiry")} variant="secondary" startIcon={<SearchIcon />} />
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default TaxAndInquiryPanel
