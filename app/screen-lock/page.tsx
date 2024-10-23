"use client"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import CustomLoader from "@atoms/custom-loading"
import Input from "@atoms/input"
import { StyleAtom } from "@atoms/states/style-atom"
import UserAtom from "@atoms/states/user-atom"
import Title from "@atoms/title"
import { LoginResponse } from "@interfaces/response-interfaces/auth/user-response-interface"
import { Login } from "@package/config/api/admin/auth/login/page"

const ScreenLock: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [stage, setStage] = useState<"precheckout" | "checkout">("precheckout")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false) // Estado de carga
  const [user] = useAtom(UserAtom)
  const [styles] = useAtom(StyleAtom)
  const posType = process.env.NEXT_PUBLIC_TYPE_POS

  useEffect(() => {
    if (stage === "checkout") {
      setLoading(false) // Ocultar loader cuando se complete la navegación
      router.push("/selfcheckout/checkout")
    }
  }, [stage, router])

  const handleStartCheckout = useCallback(() => {
    if (posType === "PV") {
      setShowPasswordDialog(true)
    } else {
      setLoading(true) // Mostrar loader cuando comience el checkout
      setStage("checkout")
    }
  }, [posType])

  const handlePasswordSubmit = useCallback(async () => {
    setLoading(true) // Mostrar loader mientras se realiza la autenticación
    const correctEmail: string = user?.email || ""
    try {
      const response: LoginResponse = await Login(correctEmail, password)
      if (response.correct) {
        setShowPasswordDialog(false)
        setStage("checkout")
      } else {
        setErrorMessage(t("msj_incorrect_password"))
      }
    } catch (err) {
      setErrorMessage(t("msj_Incorrect_credentials_try_again"))
    } finally {
      setLoading(false)
    }
  }, [user, password, t])

  const handleDialogClose = () => {
    setShowPasswordDialog(false)
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (showPasswordDialog) {
          handlePasswordSubmit()
        } else {
          handleStartCheckout()
        }
      }
    },
    [showPasswordDialog, handlePasswordSubmit, handleStartCheckout]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (showPasswordDialog && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [showPasswordDialog])

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
      spacing={10}
    >
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Grid size={{ xs: 12, md: 4 }} display="flex" justifyContent="center">
            <Image
              src="/img/logo-rhiscom-formato-blanco.png"
              alt="Wallpaper"
              width={900}
              height={700}
              style={{
                borderRadius: "10px",
                boxShadow: "0 5px 8px",
                width: "100%",
                height: "auto",
              }}
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
            <Title
              text={t("msj_this_box_is")}
              size="h3"
              sx={{ color: styles.fontColorTitle || "blue-900", marginBottom: "1.5rem" }}
            />
            <Title
              text={t("lb_open")}
              size="h1"
              sx={{ color: styles.fontColorTitle || "blue-900", marginBottom: "1.5rem" }}
            />
            <Title
              text={t("msj_press_any_key_button_start")}
              size="h5"
              sx={{ color: styles.fontColorSubtitle || "gray-500", marginBottom: "1.5rem" }}
            />
            <Button label={t("lbl_start")} variant="primary" onClick={handleStartCheckout} sx={{ marginTop: "40px" }} />

            <Dialog
              open={showPasswordDialog}
              onClose={handleDialogClose}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
            >
              <DialogTitle id="dialog-title">{t("msj_enter_password_to_continue")}</DialogTitle>
              <DialogContent>
                <Input
                  type="password"
                  value={password}
                  placeholder={t("lbl_password")}
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="current-password"
                  disabled={false}
                  ref={passwordInputRef}
                  sx={{ marginBottom: "1rem" }}
                />
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              </DialogContent>
              <DialogActions>
                <Button label={t("lbl_cancel")} variant="primary" onClick={handleDialogClose} />
                <Button label={t("lbl_submit")} variant="primary" onClick={handlePasswordSubmit} />
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ScreenLock
