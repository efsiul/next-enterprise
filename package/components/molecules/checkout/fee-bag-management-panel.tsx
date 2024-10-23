import DeleteIcon from "@mui/icons-material/Delete"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React from "react"

import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { Tooltip } from "@atoms/tooltip"

const FeeAndBagManagementPanel: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_bag_fee")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button
              label={t("lbl_bag_fee")}
              variant="primary"
              startIcon={<ShoppingBagIcon />}
              onClick={() => {
                /* lógica adicional aquí si es necesario */
              }}
            />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_bag_credit")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button
              label={t("lbl_bag_credit")}
              variant="primary"
              startIcon={<ShoppingBasketIcon />}
              onClick={() => {
                /* lógica adicional aquí si es necesario */
              }}
            />
          </Box>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Tooltip explainer={t("msj_bottle_refund")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button
              label={t("lbl_bottle_refund")}
              variant="primary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                /* lógica adicional aquí si es necesario */
              }}
            />
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default FeeAndBagManagementPanel
