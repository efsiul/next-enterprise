"use client"
import * as MUIIcons from "@mui/icons-material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface IconProps {
  name: keyof typeof MUIIcons
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = MUIIcons[name]
  const [styles] = useAtom(StyleAtom)

  return (
    <IconComponent
      className={className}
      style={{
        color: styles.fontColorItem1 || "inherit",
        fontSize: styles.fontSizeItem1 || "24px",
      }}
    />
  )
}

export default Icon
