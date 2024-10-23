"use client"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import Image from "next/image"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleAtom } from "@atoms/states/style-atom"
import Title from "@atoms/title"
import ForgotPasswordForm from "@organisms/auth/forgot-password-form"
import LoginForm from "@organisms/auth/login-form"

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [styles] = useAtom(StyleAtom)

  return (
    <Grid
      container
      className="min-h-screen"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: `linear-gradient(to right, ${styles.loginBackgroundStart || "#35424A"}, ${
          styles.loginBackgroundEnd || "#2C3E50"
        })`,
        padding: "2rem",
      }}
      spacing={8}
    >
      <Grid size={{ xs: 12, md: 4 }} display="flex" justifyContent="center">
        <Image
          src="/img/logo-rhiscom-formato-blanco.png"
          alt="Wallpaper"
          width={300}
          height={300}
          style={{ borderRadius: "10px", boxShadow: "0 5px 8px", width: "100%", height: "auto" }}
          priority
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundColor: styles.loginBoxBackgroundColor || "white",
          padding: "2.5rem",
          borderRadius: "10px",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {showForgotPassword ? (
          <>
            <Title
              text={t("lbl_reset_password")}
              size="h2"
              sx={{ color: styles.fontColorTitle || "blue-900", marginBottom: "1.5rem" }}
            />
            <ForgotPasswordForm />
            <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
              <span
                onClick={() => setShowForgotPassword(false)}
                style={{
                  textDecoration: "underline",
                  color: styles.fontColorLabel || "blue-600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                {t("msj_back_to_login")}
              </span>
            </Grid>
          </>
        ) : (
          <>
            <Title
              text={t("lbl_sign_in")}
              size="h2"
              sx={{ color: styles.fontColorTitle || "blue-900", marginBottom: "1.5rem" }}
            />
            <LoginForm />
            <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
              <span
                onClick={() => setShowForgotPassword(true)}
                style={{
                  textDecoration: "underline",
                  color: styles.fontColorLabel || "blue-600",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                {t("msj_forgot_password")}
              </span>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default LoginPage
