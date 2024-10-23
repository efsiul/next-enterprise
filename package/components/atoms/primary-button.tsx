"use client"
import { Button as MUIButton } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface PrimaryButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick, disabled }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <MUIButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: styles.backgroundColorPrimaryButton || "#0472CD",
        color: styles.fontColorPrimaryButton || "#fff",
        fontSize: styles.fontSizePrimaryButton || "1rem",
        fontFamily: styles.fontPrimaryButton || "Arial",
        "&:active": {
          backgroundColor: styles.pressedColorPrimaryButton || "#0844A4",
        },
      }}
      variant="contained"
    >
      {label}
    </MUIButton>
  )
}

export default PrimaryButton
