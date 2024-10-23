import { BASE_URL_SALE } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { GetSaleOutputInterface } from "@interfaces/output-Interfaces/sale/get-sale-output-interface"
import { GetSaleResponseInterface } from "@interfaces/response-interfaces/sale/get-sale-response-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function GetSale(ae_object: GetSaleOutputInterface) {
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
      idTransaction: ae_object.idTransaction ?? "",
      storeNumber: ae_object.storeNumber ?? 0,
      idSubsidiary: ae_object.idSubsidiary ?? "",
      idUser: ae_object.idUser ?? "",
      pos: ae_object.pos ?? "",
    }),
  }

  let data: GetSaleResponseInterface = await FetchData(BASE_URL_SALE, "getSale", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export default GetSale
