import { BASE_URL_CUSTOMER_TYPEDNI } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { GetTypeDNIOutputInterface } from "@interfaces/output-Interfaces/customer/get-type-DNI-output-interface"
import { GetAllTypeDNIResponseInterface } from "@interfaces/response-interfaces/customer/get-all-type-DNI-response-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@package/utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function GetTypeDni(ae_object: GetTypeDNIOutputInterface) {
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
      longitude: ae_object.longitude ?? "",
      status: ae_object.status ?? null,
      idMethodValidation: ae_object.idMethodValidation ?? "",
      nameMethodValidation: ae_object.nameMethodValidation ?? "",
      idUser: ae_object.idUser ?? "",
      dataType: ae_object.dataType ?? "",
      size: ae_object.size ?? 1000,
      page: ae_object.page ?? 0,
    }),
  }

  const data = (await FetchData(BASE_URL_CUSTOMER_TYPEDNI, "all", options)) as GetAllTypeDNIResponseInterface

  if (data.correct) {
    return data.object
  }
  return data
}
export { GetTypeDni }
