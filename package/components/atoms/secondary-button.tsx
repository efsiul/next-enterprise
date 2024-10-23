"use client"
import { Button as MUIButton } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface SecondaryButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick, disabled }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <MUIButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: styles.backgroundColorSecondaryButton || "#F07D00",
        color: styles.fontColorSecondaryButton || "#fff",
        fontSize: styles.fontSizeSecondaryButton || "1rem",
        fontFamily: styles.fontSecondaryButton || "Arial",
        "&:active": {
          backgroundColor: styles.pressedColorSecondaryButton || "#AA671D",
        },
      }}
      variant="contained"
    >
      {label}
    </MUIButton>
  )
}

export default SecondaryButton
