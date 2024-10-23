"use client"
import { Box, Typography } from "@mui/material"
import { useAtom, useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import Input from "@atoms/input"
import Label from "@atoms/label"
import { StyleAtom } from "@atoms/states/style-atom"
import UserAtom from "@atoms/states/user-atom"
import { LoginResponse } from "@interfaces/response-interfaces/auth/user-response-interface"
import { Login } from "@package/config/api/admin/auth/login/page"

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useTranslation()
  const setUser = useSetAtom(UserAtom)
  const [styles] = useAtom(StyleAtom)

  const handleLogin = async () => {
    try {
      const response: LoginResponse = await Login(email, password)
      if (response.correct) {
        setUser(response.object)
        router.push("/selfcheckout/checkout")
      } else {
        setError(response.message || t("msj_Incorrect_credentials_try_again"))
      }
    } catch (err) {
      setError(t("msj_Incorrect_credentials_try_again"))
    }
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        backgroundColor: styles.backgroundColorLoginForm || "white",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Label htmlFor="email" text={t("lbl_email")} />
        <Input
          type="email"
          placeholder={t("msj_enter_your_email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autocomplete="email"
          sx={{
            backgroundColor: styles.backgroundColorInput || "white",
            color: styles.fontColorInput || "black",
          }}
        />
      </Box>

      <Box>
        <Label htmlFor="password" text={t("lbl_password")} />
        <Input
          type="password"
          placeholder={t("msj_enter_your_password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autocomplete="current-password"
          sx={{
            backgroundColor: styles.backgroundColorInput || "white",
            color: styles.fontColorInput || "black",
          }}
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Button
        label={t("lbl_login")}
        onClick={handleLogin}
        variant="primary"
        sx={{
          backgroundColor: styles.backgroundColorPrimaryButton || "#0472CD",
          color: styles.fontColorPrimaryButton || "#FFFFFF",
          "&:hover": {
            backgroundColor: styles.pressedColorPrimaryButton || "#0844A4",
          },
        }}
      />
    </Box>
  )
}

export default LoginForm
