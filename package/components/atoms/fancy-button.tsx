import { SxProps } from "@mui/material"
import { useAtom } from "jotai"
import React, { forwardRef } from "react"
import { StyleAtom } from "@atoms/states/style-atom"
import styles from "@package/styles/fancy-button.module.css"

interface FancyButtonProps {
  label: string
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info"
  onClick?: () => void
  disabled?: boolean
  className?: string
  startIcon?: React.ReactNode
  sx?: SxProps
}

const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(
  (
    { label, type = "button", variant = "primary", onClick, disabled, className = "", startIcon, sx = {} as SxProps },
    ref
  ) => {
    const [stylesFromAPI] = useAtom(StyleAtom)

    const colorMap: Record<string, string> = {
      primary: stylesFromAPI.buttonPrimaryColor || "mediumspringgreen",
      secondary: stylesFromAPI.buttonSecondaryColor || "#1f2937",
      success: stylesFromAPI.buttonSuccessColor || "green",
      danger: stylesFromAPI.buttonDangerColor || "red",
      warning: stylesFromAPI.buttonWarningColor || "yellow",
      info: stylesFromAPI.buttonInfoColor || "blue",
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.fancyButton} ${className}`}
        style={{
          borderColor: colorMap[variant] || "transparent",
          color: colorMap[variant],
          ...(sx as React.CSSProperties),
        }}
      >
        {startIcon && <span className="icon">{startIcon}</span>}
        <span className={styles.transition}></span>
        <span className={styles.gradient}></span>
        <span className={styles.label}>{label}</span>
      </button>
    )
  }
)

FancyButton.displayName = "FancyButton"

export default FancyButton
