import { BASE_URL_CUSTOMER_TYPEDNI } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { SaveTypeDniOutputInterface } from "@interfaces/output-Interfaces/customer/save-type-DNI-output-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@package/utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function SaveTypeDni(ae_object: SaveTypeDniOutputInterface) {
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
      id: ae_object.id ?? "",
      name: ae_object.name ?? "",
      alias: ae_object.alias ?? "",
      longitude: ae_object.longitude ?? 0,
      status: ae_object.status ?? null,
      idMethodValidation: ae_object.idMethodValidation ?? "",
      idUser: ae_object.idUser ?? "",
      dataType: ae_object.dataType ?? "",
    }),
  }
  const data = await FetchData(BASE_URL_CUSTOMER_TYPEDNI, "save", options)

  if (data.correct) {
    return data.object
  }
  return data
}

export { SaveTypeDni }
