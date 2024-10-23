"use client"
import { CardContent, CardHeader, Card as MUICard } from "@mui/material"
import { SxProps, Theme } from "@mui/system" // Importamos los tipos para 'sx'
import React from "react"

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  sx?: SxProps<Theme> // Añadimos la propiedad 'sx' para estilos personalizados
}

const CustomCard: React.FC<CardProps> = ({ title, children, className, sx }) => {
  return (
    <MUICard className={className} sx={sx}>
      {" "}
      {/* Usamos 'sx' aquí */}
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </MUICard>
  )
}

export default CustomCard
