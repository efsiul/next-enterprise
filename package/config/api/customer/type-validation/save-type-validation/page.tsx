import { BASE_URL_CUSTOMER_VALIDATION } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { SaveTypeValidationOutputInterface } from "@interfaces/output-Interfaces/customer/save-type-validation-output-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@package/utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function SaveTypeValidation(ae_object: SaveTypeValidationOutputInterface) {
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
      idCountry: ae_object.idCountry ?? "",
      name: ae_object.name ?? "",
      alias: ae_object.alias ?? "",
      status: ae_object.status ?? null,
      idUser: ae_object.idUser ?? "",
    }),
  }
  const data = await FetchData(BASE_URL_CUSTOMER_VALIDATION, "save", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export { SaveTypeValidation }
