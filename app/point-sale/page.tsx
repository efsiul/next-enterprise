"use client"
import { Box } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useRef } from "react"
import CheckoutLayout from "@layouts/checkout-layout"

const PointOfSaleScreen: React.FC = () => {
  const router = useRouter()
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleInactivity = useCallback(() => {
    if (typeof window !== "undefined") {
      router.push("/selfcheckout/precheckout")
    }
  }, [router])

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current)
    }
    inactivityTimeoutRef.current = setTimeout(handleInactivity, 120000)
  }, [handleInactivity])

  useEffect(() => {
    const events = ["mousemove", "keydown", "click"]

    events.forEach((event) => window.addEventListener(event, resetInactivityTimer))

    resetInactivityTimer()

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }

      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer))
    }
  }, [resetInactivityTimer])

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "90vh",
        bgcolor: "background.default",
        boxShadow: "4",
        overflow: "hidden",
      }}
    >
      <CheckoutLayout />
    </Box>
  )
}

export default PointOfSaleScreen
