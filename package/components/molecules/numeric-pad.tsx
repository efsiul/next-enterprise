"use client"
import Grid from "@mui/material/Grid2"
import React from "react"
import { useTranslation } from "react-i18next"
import NumericKey from "@molecules/numeric-key"
import { useAtom } from "jotai"
import { StyleAtom } from "@atoms/states/style-atom"

interface NumericPadProps {
  onKeyClick: (key: string) => void
  enableParentheses?: boolean
  enableDot?: boolean
}

const NumericPad: React.FC<NumericPadProps> = ({ onKeyClick, enableParentheses = false, enableDot = false }) => {
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  return (
    <Grid container spacing={{ xs: 1, sm: 1, md: 0.5 }} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 6, sm: 6, md: 6 }}>
        <NumericKey
          label={t("lbl_clear")}
          onClick={() => onKeyClick("clear")}
          customStyles={{
            backgroundColor: styles.backgroundColorDangerButton || "red",
            color: styles.fontColorSecondaryButton || "white",
          }}
        />
      </Grid>

      {enableDot && (
        <>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <NumericKey
              label={t("lbl_enter")}
              onClick={() => onKeyClick("enter")}
              customStyles={{
                backgroundColor: styles.backgroundColorSuccessButton || "green",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          {[...Array(10).keys()].map((i) => (
            <Grid key={i} size={{ xs: 4, sm: 4, md: 4 }}>
              <NumericKey
                label={i}
                onClick={() => onKeyClick(i.toString())}
                customStyles={{
                  backgroundColor: styles.backgroundColorPrimaryButton || "blue",
                  color: styles.fontColorPrimaryButton || "white",
                }}
              />
            </Grid>
          ))}

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <NumericKey
              label="."
              onClick={() => onKeyClick(".")}
              customStyles={{
                backgroundColor: styles.backgroundColorPrimaryButton || "blue",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <NumericKey
              label={t("lbl_delete")}
              onClick={() => onKeyClick("delete")}
              customStyles={{
                backgroundColor: styles.backgroundColorSecondaryButton || "orange",
                color: styles.fontColorSecondaryButton || "white",
              }}
            />
          </Grid>
        </>
      )}

      {enableParentheses && (
        <>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <NumericKey
              label={t("lbl_add")}
              onClick={() => onKeyClick("add")}
              customStyles={{
                backgroundColor: styles.backgroundColorSuccessButton || "green",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          {[...Array(10).keys()].map((i) => (
            <Grid key={i} size={{ xs: 4, sm: 4, md: 4 }}>
              <NumericKey
                label={i}
                onClick={() => onKeyClick(i.toString())}
                customStyles={{
                  backgroundColor: styles.backgroundColorPrimaryButton || "blue",
                  color: styles.fontColorPrimaryButton || "white",
                }}
              />
            </Grid>
          ))}

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <NumericKey
              label="("
              onClick={() => onKeyClick("(")}
              customStyles={{
                backgroundColor: styles.backgroundColorPrimaryButton || "blue",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <NumericKey
              label=")"
              onClick={() => onKeyClick(")")}
              customStyles={{
                backgroundColor: styles.backgroundColorPrimaryButton || "blue",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          <Grid size={{ xs: 8, sm: 8, md: 8 }}>
            <NumericKey
              label={t("lbl_pay")}
              onClick={() => onKeyClick("pay")}
              customStyles={{
                backgroundColor: styles.backgroundColorSuccessButton || "green",
                color: styles.fontColorPrimaryButton || "white",
              }}
            />
          </Grid>

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <NumericKey
              label={t("lbl_delete")}
              onClick={() => onKeyClick("delete")}
              customStyles={{
                backgroundColor: styles.backgroundColorSecondaryButton || "orange",
                color: styles.fontColorSecondaryButton || "white",
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default NumericPad
