"use client"

import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useAtom } from "jotai" // Usamos Jotai para los estilos
import React from "react"
import { useTranslation } from "react-i18next"
import { StyleAtom } from "@atoms/states/style-atom" // Importamos los estilos desde StyleAtom
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import { SaleTransactionObjectInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import TotalsTable from "@molecules/checkout/table-totals"
import CustomerHeader from "@molecules/customer-header"

interface ProductTableProps {
  products: SaleTransactionObjectInterface | null
  customer: CustomerListInterface
}

const ProductTable: React.FC<ProductTableProps> = ({ products, customer }) => {
  const { t } = useTranslation()
  const [styles] = useAtom(StyleAtom)

  const columns: GridColDef[] = [
    {
      field: "quantity",
      headerName: t("tle_amount"),
      flex: 1,
      minWidth: 50,
      headerClassName: "headerColumn",
    },
    {
      field: "name",
      headerName: t("tle_product"),
      flex: 2,
      minWidth: 200,
      headerClassName: "headerColumn",
    },
    {
      field: "regularUnitPrice",
      headerName: t("tle_unit_value"),
      flex: 1,
      minWidth: 120,
      headerClassName: "headerColumn",
      renderCell: (params) => `$${params.value?.toFixed(2)}`,
    },
    {
      field: "totalTaxes",
      headerName: t("tle_tax"),
      flex: 1,
      minWidth: 120,
      headerClassName: "headerColumn",
      renderCell: (params) => `$${params.value?.toFixed(2)}`,
    },
    {
      field: "discount",
      headerName: t("tle_discount"),
      flex: 1,
      minWidth: 120,
      headerClassName: "headerColumn",
      renderCell: (params) => `$${params.value?.toFixed(2)}`,
    },
    {
      field: "extendedPrice",
      headerName: t("tle_total"),
      flex: 1,
      minWidth: 120,
      headerClassName: "headerColumn",
      renderCell: (params) => `$${params.value?.toFixed(2)}`,
    },
  ]

  const rows =
    products?.list.map((product, index) => ({
      id: index + 1,
      quantity: product.quantity,
      name: product.name,
      regularUnitPrice: product.regularUnitPrice,
      totalTaxes: product.totalTaxes,
      discount: product.discount,
      extendedPrice: product.extendedPrice,
    })) || []

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CustomerHeader customer={customer} />

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: { xs: 1, md: 1 },
          boxShadow: styles.boxShadow || 2,
          backgroundColor: "#fff",
          height: "100%",
          maxHeight: "450px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: styles.backgroundColorHeader || "primary.main",
              color: styles.fontColorTitleHeader || "white",
              fontWeight: "bold",
              borderBottom: `3px solid ${styles.fontColorTitleHeader || "#FFF"}`,
            },
            "& .MuiDataGrid-cell": {
              padding: { xs: "6px 8px", md: "8px 16px" },
              color: styles.fontColorItem1 || "black",
              fontFamily: styles.fontItem1 || "Arial",
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": {
                backgroundColor: styles.rowBackgroundOdd || "#f5f5f5",
              },
              "&:nth-of-type(even)": {
                backgroundColor: styles.rowBackgroundEven || "#ffffff",
              },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textTransform: "uppercase",
              fontWeight: "bold",
              color: styles.fontColorLabel || "black",
              fontSize: styles.fontSizeLabel || "0.9rem",
            },
            "& .MuiDataGrid-scrollbar": {
              pointerEvents: "none",
            },
          }}
        />
      </Box>

      <Grid size={{ xs: 12, md: 12 }} sx={{ height: "20%", backgroundColor: styles.backgroundColorHeader || "#fff" }}>
        <TotalsTable products={products} />
      </Grid>
    </Box>
  )
}

export default ProductTable
