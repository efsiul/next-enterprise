"use client";

import { Box } from "@mui/material";
import React from "react";
import styles from "@styles/custom-card.module.css";

interface CustomCardProps {
  customStyles?: React.CSSProperties;
  beforeContent?: React.ReactNode;  // Contenido antes del children
  afterContent?: React.ReactNode;   // Contenido después del children
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  customStyles = {},
  beforeContent,
  afterContent,
  children,
}) => {
  return (
    <Box className={styles["one-div"]} sx={customStyles}>
      {/* Contenido antes del children (antes de la tarjeta) */}
      <Box className={styles["custom-before"]}>
        {beforeContent}
      </Box>

      {/* Contenido principal centrado */}
      <Box className={styles["custom-content"]}>
        {children}
      </Box>

      {/* Contenido después del children (sobre la tarjeta) */}
      <Box className={styles["custom-after"]}>
        {afterContent}
      </Box>
    </Box>
  );
};

export default CustomCard;
