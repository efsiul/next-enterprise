"use client"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useAtom } from "jotai"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "@atoms/button"
import CustomLoading from "@atoms/custom-loading"
import { storeNumberAtom, storePosAtom } from "@atoms/states/store-atom"
import { StyleAtom } from "@atoms/states/style-atom"
import Title from "@atoms/title"
import { useClientSearchLogic } from "@hooks/use-client-search-logic"
import { CustomerListInterface } from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"
import ClientSearchInputPanel from "@organisms/checkout/client-search-Input-panel"
import StartSale from "@api/sale/transaction/start-sale/page"
import { getUser } from "@utils/utilities"

interface ClientSearchProps {
  onTransactionComplete: (transaction: StartSaleResponseInterface, client: CustomerListInterface) => void
}

const ClientSearch: React.FC<ClientSearchProps> = ({ onTransactionComplete }) => {
  const { idTypes, loading, error, result, formData, handleInputChange, handleSubmitForm, isAffiliated, customer } =
    useClientSearchLogic()

  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [idUser] = useState(getUser() && getUser().id ? getUser().id : "")
  const [storeNumber] = useAtom(storeNumberAtom)
  const [storePos] = useAtom(storePosAtom)
  const [showSearchPanel, setShowSearchPanel] = useState(true)

  const [styles] = useAtom(StyleAtom)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleUseGenericCustomer = async () => {
    const genericCustomer = {
      id: "1",
      idCompany: "3",
      companyName: "Cruz Verde",
      idSubsidiary: 3,
      nameSubsidiary: "Cruz Verde Subsidiary",
      externalClientId: null,
      name: "Cliente",
      secondName: "",
      firstSurname: "Genérico",
      secondSurname: "",
      idTypeCustomer: "12",
      nameTypeCustomer: "Tarjeta de identidad",
      dni: "222222222222",
      idGender: "3",
      nameGender: "Otro",
      idMaritalStatus: null,
      nameMaritalStatus: "S/D",
      address: "-",
      idCity: null,
      nameCity: null,
      idCountry: null,
      nameCountry: null,
      mail: "cliente.final@clinetefinal.com",
      phone: "+0000000000",
      idUser: "1",
      nameUser: "Admin Systems",
      status: true,
      birthdate: null,
      group: [],
      NameSurname: "Cliente  Genérico",
      SurnameName: "Genérico  Cliente",
    }

    const saleData = {
      storeNumber: storeNumber,
      idSubsidiary: genericCustomer.idSubsidiary,
      idClient: genericCustomer.id,
      clientDni: genericCustomer.dni,
      idType: genericCustomer.idTypeCustomer,
      idGroup: "",
      invoiceName: genericCustomer.name,
      invoiceTypeNit: genericCustomer.idTypeCustomer,
      invoiceNit: genericCustomer.dni,
      invoiceDirection: genericCustomer.address,
      invoiceCellPhone: genericCustomer.phone,
      invoiceEmail: genericCustomer.mail,
      idUser: idUser,
      localDate: new Date().toISOString(),
      pos: storePos,
    }

    const saleResponse = (await StartSale(saleData)) as StartSaleResponseInterface

    if (saleResponse && saleResponse.correct) {
      if (genericCustomer) {
        onTransactionComplete(saleResponse, genericCustomer)
      } else {
        console.error("Customer is null")
      }
    } else {
      console.error(saleResponse.message)
    }
  }

  const handleContinue = async () => {
    if (customer) {
      const saleData = {
        storeNumber: storeNumber,
        idSubsidiary: customer.idSubsidiary || 0,
        idClient: customer.id,
        clientDni: customer.dni,
        idType: customer.idTypeCustomer,
        idGroup: "",
        invoiceName: customer.name,
        invoiceTypeNit: customer.idTypeCustomer,
        invoiceNit: customer.dni,
        invoiceDirection: customer.address,
        invoiceCellPhone: customer.phone,
        invoiceEmail: customer.mail,
        idUser: idUser,
        localDate: new Date().toISOString(),
        pos: storePos,
      }
      const saleResponse = (await StartSale(saleData)) as StartSaleResponseInterface

      if (saleResponse && saleResponse.correct) {
        onTransactionComplete(saleResponse, customer)
      } else {
        console.error(saleResponse.message)
      }
    } else {
      console.warn("Customer is null, showing generic customer dialog")
      handleOpenDialog()
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const event = {
      target: {
        name: "idType",
        value: e.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(event)
  }

  const handleSubmit = () => {
    handleSubmitForm()
    setShowSearchPanel(false)
  }

  const handleNewSearch = () => {
    setShowSearchPanel(true)
  }

  return (
    <Paper
      elevation={5}
      sx={{
        mx: "auto",
        maxWidth: { xs: "100%", md: "100%" },
        p: { xs: 1, md: 1 },
        backgroundColor: "#FFFFFF",
      }}
    >
      {showSearchPanel ? (
        <>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Title text={t("lbl_client_search")} size="h4" sx={{ color: styles.fontColorTitle }} />
          </Grid>
          <ClientSearchInputPanel
            idTypes={idTypes}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmitForm={handleSubmit}
            loading={loading}
          />
        </>
      ) : (
        <>
          <Grid container justifyContent="flex-end" sx={{ mt: { xs: 2, md: 3 } }}>
            <Button label={t("lbl_new_search")} variant="primary" onClick={handleNewSearch} />
          </Grid>

          {loading && (
            <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 3 } }}>
              <CustomLoading />
            </Grid>
          )}

          {error && (
            <Typography color="error" sx={{ mt: { xs: 2, md: 3 } }}>
              {error}
            </Typography>
          )}

          {result.length === 0 && !isAffiliated && (
            <Paper elevation={2} sx={{ mt: { xs: 2, md: 4 }, p: { xs: 2, md: 4 } }}>
              <Title text={t("msj_no_affiliate")} size="h4" sx={{ color: styles.fontColorTitle }} />
              <Typography variant="body1" sx={{ mt: { xs: 1, md: 2 }, color: styles.fontColorSubtitle }}>
                {t("msj_choose_option_for_non_affiliate")}
              </Typography>
              <Grid container justifyContent="center" gap={2} sx={{ mt: { xs: 2, md: 3 } }}>
                <Button label={t("lbl_use_generic_customer")} variant="primary" onClick={handleOpenDialog} />
              </Grid>
            </Paper>
          )}

          {result.length > 0 && (
            <Paper elevation={2} sx={{ mt: { xs: 2, md: 4 }, p: { xs: 2, md: 4 } }}>
              <Title text={t("lbl_search_result")} size="h4" sx={{ color: styles.fontColorTitle }} />
              {result.map((customer) => (
                <Grid container spacing={2} sx={{ mt: 2 }} key={customer.id}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body1" sx={{ color: styles.fontColorItem1 }}>
                      <strong>{t("lbl_name")}:</strong> {customer.name}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body1" sx={{ color: styles.fontColorItem1 }}>
                      <strong>{t("lbl_last_name")}:</strong> {customer.firstSurname}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body1" sx={{ color: styles.fontColorItem1 }}>
                      <strong>{t("lbl_email")}:</strong> {customer.mail}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body1" sx={{ color: styles.fontColorItem1 }}>
                      <strong>{t("lbl_phone")}:</strong> {customer.phone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body1" sx={{ color: styles.fontColorItem1 }}>
                      <strong>{t("lbl_address")}:</strong> {customer.address}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Grid container justifyContent="flex-end" sx={{ mt: { xs: 2, md: 3 } }}>
                <Button label={t("lbl_continue")} variant="primary" onClick={handleContinue} />
              </Grid>
            </Paper>
          )}

          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: "center", color: styles.fontColorTitle }}>
              {t("msj_confirm_generic_customer")}
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <DialogContentText sx={{ color: styles.fontColorSubtitle }}>
                {t("msj_are_you_sure_generic_customer")}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleCloseDialog} label={t("lbl_cancel")} />
              <Button onClick={handleUseGenericCustomer} label={t("lbl_confirm")} variant="primary" />
            </DialogActions>
          </Dialog>
        </>
      )}
    </Paper>
  )
}

export default ClientSearch
