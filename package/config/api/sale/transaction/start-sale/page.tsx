import { BASE_URL_SALE } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { StartSaleOutputInterface } from "@interfaces/output-Interfaces/sale/start-sale-output-interface"
import { StartSaleResponseInterface } from "@interfaces/response-interfaces/sale/start-sale-response-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function StartSale(ae_object: StartSaleOutputInterface) {
  const token = getKeyApi()
  if (token === "") {
    return new ReturnService("", false, i18n.t("errorTokenAPI"), 102)
  }

  const options: RequestInit = {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      lng: BASE_URL_LANGUAGE,
    },
    body: JSON.stringify({
      storeNumber: ae_object.storeNumber ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      idClient: ae_object.idClient ?? "",
      clientDni: ae_object.clientDni ?? "",
      idType: ae_object.idType ?? "",
      idGroup: ae_object.idGroup ?? "",
      invoiceName: ae_object.invoiceName ?? "",
      invoiceTypeNit: ae_object.invoiceTypeNit ?? "",
      invoiceNit: ae_object.invoiceNit ?? "",
      invoiceDirection: ae_object.invoiceDirection ?? "",
      invoiceCellPhone: ae_object.invoiceCellPhone ?? "",
      invoiceEmail: ae_object.invoiceEmail ?? "",
      idUser: ae_object.idUser ?? "",
      localDate: ae_object.localDate ?? "",
      pos: ae_object.pos ?? "",
    }),
  }

  let data: StartSaleResponseInterface = await FetchData(BASE_URL_SALE, "startSale", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export default StartSale
