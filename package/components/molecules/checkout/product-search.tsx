"use client"

import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Input from "@atoms/input"
import { StyleAtom } from "@atoms/states/style-atom"
import NumericPad from "@molecules/numeric-pad"

interface ProductSearchProps {
  onAdd: () => void
  onEndSale: () => void
  setSKU: (sku: string) => void
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onAdd, onEndSale, setSKU }) => {
  const [plu, setPlu] = useState("")
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  useEffect(() => {
    setSKU(plu)
  }, [plu, setSKU])

  const handleKeyClick = (key: string) => {
    if (key === "clear") {
      setPlu("")
    } else if (key === "delete") {
      setPlu(plu.slice(0, -1))
    } else if (key === "add") {
      onAdd()
      if (plu) {
        setPlu("")
      }
    } else if (key === "pay") {
      onEndSale()
    } else {
      setPlu(plu + key)
    }
  }

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 1 },
        mb: { xs: 1, sm: 1 },
        boxShadow: 4,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Input
            type="text"
            value={plu}
            placeholder={t("msj_enter_plu")}
            onChange={(e) => setPlu(e.target.value)}
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

      <Box sx={{ mt: 1 }}>
        <NumericPad onKeyClick={handleKeyClick} enableParentheses={true} />
      </Box>
    </Box>
  )
}

export default ProductSearch
