"use client"
import { MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import { useTranslation } from "react-i18next"
import Input from "@atoms/input"
import Label from "@atoms/label"
import { StyleAtom } from "@atoms/states/style-atom"
import { CustomerDniTypeInterface } from "@interfaces/response-interfaces/customer/get-all-type-DNI-response-interface"
import ToggleableKeyPad from "@organisms/toggleable-key-pad"

interface ClientSearchInputPanelProps {
  idTypes: CustomerDniTypeInterface[]
  formData: { idType: string; idNumber: string }
  handleSelectChange: (e: SelectChangeEvent<string>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitForm: () => void
  loading: boolean
}

const ClientSearchInputPanel: React.FC<ClientSearchInputPanelProps> = ({
  idTypes,
  formData,
  handleSelectChange,
  handleInputChange,
  handleSubmitForm,
  loading,
}) => {
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  const handleKeyClick = (key: string) => {
    let newValue = formData.idNumber

    if (key === "clear") {
      newValue = ""
    } else if (key === "delete") {
      newValue = formData.idNumber.slice(0, -1)
    } else if (key === "enter") {
      handleSubmitForm()
    } else {
      newValue = formData.idNumber + key
    }

    const event = {
      target: {
        name: "idNumber",
        value: newValue,
      },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(event)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        my: 2,
        backgroundColor: "#FFF",
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Label
            htmlFor="idType"
            text={t("lbl_id_type")}
            sx={{
              color: styles.fontColorLabel || "#000",
              fontSize: styles.fontSizeLabel || "1rem",
              fontFamily: styles.fontFamily || "Arial",
              fontWeight: styles.fontWeight || "bold",
            }}
          />
          <Select
            name="idType"
            value={formData.idType}
            onChange={handleSelectChange}
            disabled={loading}
            fullWidth
            sx={{
              p: 1,
              backgroundColor: "#f1f1f1",
              color: styles.fontColorTotals1 || "#000",
              fontSize: { xs: "0.9rem", md: "1rem" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: styles.backgroundColorPrimaryButton || "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: styles.backgroundColorPrimaryButton || "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: styles.backgroundColorPrimaryButton || "#000",
                },
              },
            }}
          >
            <MenuItem value="">{t("lbl_selectid_type")}</MenuItem>
            {idTypes.length > 0 ? (
              idTypes.map((type: CustomerDniTypeInterface) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>{t("msj_loading_id_types")}</MenuItem>
            )}
          </Select>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Label
            htmlFor="idNumber"
            text={t("lbl_id_number")}
            sx={{
              color: styles.fontColorLabel || "#000",
              fontSize: styles.fontSizeLabel || "1rem",
              fontFamily: styles.fontFamily || "Arial",
              fontWeight: styles.fontWeight || "bold",
            }}
          />
          <Input
            type="text"
            name="idNumber"
            placeholder={t("msj_enter_id_number")}
            value={formData.idNumber}
            onChange={handleInputChange}
            disabled={loading}
            sx={{
              backgroundColor: "#f0f0f0",
              color: styles.fontColorItem1 || "#000",
              fontSize: styles.fontSizeItem1 || "1rem",
              borderColor: styles.backgroundColorPrimaryButton || "#ccc",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: styles.backgroundColorPrimaryButton || "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: styles.pressedColorPrimaryButton || "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: styles.backgroundColorPrimaryButton || "#000",
                },
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Teclado numérico */}
      <Grid container justifyContent="center" sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <ToggleableKeyPad onKeyClick={handleKeyClick} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ClientSearchInputPanel
