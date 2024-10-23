import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React from "react"
import { StyleAtom } from "@atoms/states/style-atom"
import NumericKey from "@molecules/numeric-key"

interface AlphaNumericPadProps {
  onKeyClick: (key: string) => void
}

const AlphaNumericPad: React.FC<AlphaNumericPadProps> = ({ onKeyClick }) => {
  const letters = [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z"],
  ]

  const [styles] = useAtom(StyleAtom)

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {letters.map((row, rowIndex) => (
        <Grid key={rowIndex} container size={{ xs: 12 }} justifyContent="center" spacing={3.3}>
          {row.map((letter) => (
            <Grid key={letter} size={{ xs: 1.5 }} sx={{ minWidth: "40px" }}>
              <NumericKey
                label={letter}
                onClick={() => onKeyClick(letter)}
                customStyles={{
                  backgroundColor: styles.backgroundColorPrimaryButton || "#0472CD",
                  color: styles.fontColorPrimaryButton || "#FFFFFF",
                  "&:hover": {
                    backgroundColor: styles.pressedColorPrimaryButton || "#0844A4",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  )
}

export default AlphaNumericPad
