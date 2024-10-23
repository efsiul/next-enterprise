"use client"
import Grid from "@mui/material/Grid2"
import React, { useState } from "react"
import Button from "@atoms/button"
import AlphaNumericPad from "@molecules/alpha-numeric-pad"
import NumericPad from "@molecules/numeric-pad"

interface ToggleableKeyPadProps {
  onKeyClick: (key: string) => void
}

const ToggleableKeyPad: React.FC<ToggleableKeyPadProps> = ({ onKeyClick }) => {
  const [isNumeric, setIsNumeric] = useState(true)
  const handleToggle = () => {
    setIsNumeric(!isNumeric)
  }

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12 }} sx={{ textAlign: "center", mb: 2 }}>
        <Button
          label={isNumeric ? "Switch to Alphabetic" : "Switch to Numeric"}
          onClick={handleToggle}
          className="bg-primary-500 text-white"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        {isNumeric ? (
          <NumericPad onKeyClick={onKeyClick} enableDot={true} />
        ) : (
          <AlphaNumericPad onKeyClick={onKeyClick} />
        )}
      </Grid>
    </Grid>
  )
}

export default ToggleableKeyPad
