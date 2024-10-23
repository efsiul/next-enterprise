import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import LockIcon from "@mui/icons-material/Lock"
import SearchIcon from "@mui/icons-material/Search"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"

const GenericActionsPanel: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 6, sm: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Button label={t("lbl_settings")} variant="primary" startIcon={<SettingsIcon />} />
        </Box>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Button label={t("lbl_wallet")} variant="primary" startIcon={<AccountBalanceWalletIcon />} />
        </Box>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Button label={t("lbl_search")} variant="primary" startIcon={<SearchIcon />} />
        </Box>
      </Grid>
      <Grid size={{ xs: 6, sm: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Button label={t("lbl_lock")} variant="secondary" startIcon={<LockIcon />} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default GenericActionsPanel
