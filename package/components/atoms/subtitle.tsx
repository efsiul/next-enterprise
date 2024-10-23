"use client"
import { Typography } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface SubtitleProps {
  text: string
}

const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <Typography
      variant="subtitle1"
      sx={{
        color: styles.fontColorSubtitle || "#989EB1",
        fontFamily: styles.fontSubtitle || "Arial",
        fontSize: styles.fontSizeSubtitle || "1.25rem",
      }}
    >
      {text}
    </Typography>
  )
}

export default Subtitle
