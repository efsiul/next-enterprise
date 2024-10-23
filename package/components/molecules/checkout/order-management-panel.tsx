import { Search } from "@mui/icons-material"
import BackspaceIcon from "@mui/icons-material/Backspace"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ReplayIcon from "@mui/icons-material/Replay"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import StorefrontIcon from "@mui/icons-material/Storefront"
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"

import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import { Tooltip } from "@atoms/tooltip"

interface OrderManagementPanelProps {
  onSearch: () => void
}

const OrderManagementPanel: React.FC<OrderManagementPanelProps> = ({ onSearch }) => {
  const { t } = useTranslation()

  const handleSearchClick = () => {
    onSearch()
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_product_search")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_search")} variant="primary" startIcon={<Search />} onClick={handleSearchClick} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_resume_previously_suspended_order")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_resume")} variant="primary" startIcon={<PlayArrowIcon />} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_transfer_Order_another_station")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_transfer_order")} variant="primary" startIcon={<TransferWithinAStationIcon />} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_generate_resale")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_resale")} variant="primary" startIcon={<StorefrontIcon />} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_generate_refund")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_refund")} variant="primary" startIcon={<ReplayIcon />} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_cancel_specific_order")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_void_order")} variant="secondary" startIcon={<ShoppingCartIcon />} />
          </Box>
        </Tooltip>
      </Grid>

      <Grid size={{ xs: 4, sm: 12 }}>
        <Tooltip explainer={t("msj_cancel_last_order")} side="top" withArrow>
          <Box sx={{ width: "100%" }}>
            <Button label={t("lbl_void_last")} variant="secondary" startIcon={<BackspaceIcon />} />
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default OrderManagementPanel
