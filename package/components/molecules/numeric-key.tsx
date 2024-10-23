"use client"
import { SxProps } from "@mui/material"
import Grid2 from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React from "react"
import Button from "@atoms/button"
import { StyleAtom } from "@atoms/states/style-atom"

interface NumericKeyProps {
  label: string | number
  onClick: () => void
  className?: string
  customStyles?: SxProps
}

const NumericKey: React.FC<NumericKeyProps> = ({ label, onClick, className, customStyles }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <Grid2 container justifyContent="center" component="div">
      <Button
        label={label.toString()}
        onClick={onClick}
        sx={{
          backgroundColor: styles.backgroundColorPrimaryButton || "blue",
          color: styles.fontColorPrimaryButton || "white",
          borderRadius: "8px",
          fontFamily: styles.fontPrimaryButton || "Arial",
          padding: "1rem",
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: styles.fontSizePrimaryButton || "2rem",
          },
          "&:hover": {
            backgroundColor: styles.pressedColorPrimaryButton || "darkblue",
          },
          ...customStyles,
        }}
        className={`w-full ${className}`}
      />
    </Grid2>
  )
}

export default NumericKey
