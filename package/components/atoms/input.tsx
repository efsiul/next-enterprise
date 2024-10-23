"use client"
import { TextField } from "@mui/material"
import { useAtom } from "jotai"
import React, { forwardRef } from "react"
import { StyleAtom } from "@atoms/states/style-atom"

interface InputProps {
  type: string
  name?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  autocomplete?: string
  disabled?: boolean
  sx?: object
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, placeholder, value, onChange, onKeyDown, autocomplete, disabled, sx = {} }, ref) => {
    const [styles] = useAtom(StyleAtom)

    return (
      <TextField
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete={autocomplete}
        fullWidth
        variant="outlined"
        disabled={disabled}
        inputRef={ref}
        sx={{
          backgroundColor: styles.backgroundColorInorteput || "white",
          color: styles.backgroundColorPrimaryButton || "black",
          fontSize: styles.fontSizePrimaryButton || "1rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: styles.backgroundColorPrimaryButton || "#cccccc",
            },
            "&:hover fieldset": {
              borderColor: styles.borderColorInputHover || "#888888",
            },
            "&.Mui-focused fieldset": {
              borderColor: styles.backgroundColorPrimaryButton || "#000000",
            },
          },
          ...sx,
        }}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
