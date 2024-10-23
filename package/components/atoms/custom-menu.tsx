"use client"
import { Menu, MenuItem } from "@mui/material"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface MenuProps {
  items: string[]
  anchorEl: HTMLElement | null
  handleClose: () => void
}

const CustomMenu: React.FC<MenuProps> = ({ items, anchorEl, handleClose }) => {
  const [styles] = useAtom(StyleAtom)

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {items.map((item) => (
        <MenuItem
          key={item}
          sx={{
            color: styles.fontColorMenu || "#000",
            fontFamily: styles.fontMenu || "Arial",
            fontSize: styles.fontSizeMenu || "1rem",
          }}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default CustomMenu
