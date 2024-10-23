"use client"
import LanguageIcon from "@mui/icons-material/Language"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useAtom } from "jotai"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { storeNumberAtom, storePosAtom } from "@atoms/states/store-atom"
import { StyleAtom } from "@atoms/states/style-atom"
import UserAtom from "@atoms/states/user-atom"
import Title from "@atoms/title"
import i18n from "@package/utils/language/i18n"

const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const [, setLanguage] = useState(i18n.language || "en")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [user] = useAtom(UserAtom)
  const [styles] = useAtom(StyleAtom)
  const [infoStore] = useAtom(storeNumberAtom)
  const [infoPOS] = useAtom(storePosAtom)
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    setLanguage(i18n.language)
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)

    setCurrentDateTime(new Date())

    return () => clearInterval(interval)
  }, [])

  const formattedDate = currentDateTime
    ? currentDateTime.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : ""
  const formattedTime = currentDateTime
    ? currentDateTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: styles.backgroundColorHeader || "blue",
        padding: "0.1rem",
        color: styles.fontColorTitleHeader || "white",
      }}
    >
      <Grid container alignItems="center" sx={{ marginLeft: "1rem", flexBasis: "10%" }}>
        <Image
          src="/img/logo-rhiscom-formato-blanco.png"
          alt="Logo"
          width={120}
          height={60}
          style={{ cursor: "pointer", width: "auto", height: "auto" }}
          priority
        />
      </Grid>

      <Grid sx={{ flexBasis: "50%" }}>
        <Title
          text={`${t("msj_welcome_your_self_checkout")}`}
          size="h4"
          sx={{ color: styles.fontColorTitle || "white" }}
        />
        <Typography variant="body2" sx={{ color: styles.fontColorTitleHeader || "white" }}>
          <strong>{user?.name || " "}</strong> <strong>{user?.lastName || " "}</strong>
        </Typography>
      </Grid>

      <Grid sx={{ flexBasis: "15%" }}>
        <Typography variant="body2" sx={{ color: styles.fontColorTitleHeader || "white" }}>
          {formattedDate} - {formattedTime}
        </Typography>
        <Typography variant="body2" sx={{ color: styles.fontColorTitleHeader || "white" }}>
          {t("lbl_Store")}: <strong>{infoStore || " "}</strong> | {t("lbl_register")}: <strong>{infoPOS || " "}</strong>
        </Typography>
      </Grid>

      <Grid container alignItems="center" justifyContent="flex-end" sx={{ flexBasis: "15%" }}>
        <IconButton
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ color: styles.fontColorTitleHeader || "white", marginLeft: "1rem" }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu id="language-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => changeLanguage("en")}>
            <Image
              src="/img/flags/estados-unidos.png"
              alt="English"
              width={20}
              height={15}
              style={{ marginRight: "10px" }}
            />
            English
          </MenuItem>
          <MenuItem onClick={() => changeLanguage("es")}>
            <Image src="/img/flags/espana.png" alt="Español" width={20} height={15} style={{ marginRight: "10px" }} />
            Español
          </MenuItem>
        </Menu>

        <IconButton size="small" sx={{ marginLeft: "1rem", color: styles.fontColorMenu || "white" }}>
          <MoreVertIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Navbar
