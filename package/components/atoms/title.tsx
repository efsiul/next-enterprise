"use client"
import { SxProps, Typography } from "@mui/material"
import { Theme } from "@mui/system"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface TitleProps {
  text: string
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  sx?: SxProps<Theme>
}

const Title: React.FC<TitleProps> = ({ text, size = "h1", sx }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <Typography
      variant={size}
      sx={{
        color: styles.titleTextColor || "#000",
        fontFamily: styles.fontTitle || "Arial",
        fontSize: styles.fontSizeTitle || "2rem",
        fontWeight: styles.titleFontWeight || "bold",
        ...sx,
      }}
    >
      {text}
    </Typography>
  )
}

export default Title
