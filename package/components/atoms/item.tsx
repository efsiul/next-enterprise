"use client"
import { Typography } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface ItemProps {
  text: string
  variant?: "item1" | "item2"
}

const Item: React.FC<ItemProps> = ({ text, variant = "item1" }) => {
  const [styles] = useAtom(StyleAtom)

  const fontColor = variant === "item1" ? styles.fontColorItem1 : styles.fontColorItem2
  const fontSize = variant === "item1" ? styles.fontSizeItem1 : styles.fontSizeItem2
  const fontFamily = variant === "item1" ? styles.fontItem1 : styles.fontItem2

  return (
    <Typography
      sx={{
        color: fontColor || "#000",
        fontFamily: fontFamily || "Arial",
        fontSize: fontSize || "1rem",
      }}
    >
      {text}
    </Typography>
  )
}

export default Item
