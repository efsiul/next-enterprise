import { BASE_URL_CUSTOMER } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { SaveCustomerOutputInteface } from "@interfaces/output-Interfaces/customer/save-customer-output-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@package/utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function SaveCustomer(ae_object: SaveCustomerOutputInteface) {
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
      idCompany: ae_object.idCompany ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? "",
      name: ae_object.name ?? "",
      secondName: ae_object.secondName ?? "",
      firstSurname: ae_object.firstSurname ?? "",
      secondSurname: ae_object.secondSurname ?? "",
      idTypeCustomer: ae_object.idTypeCustomer ?? "",
      dni: ae_object.dni ?? "",
      idGender: ae_object.idGender ?? "",
      idMaritalStatus: ae_object.idMaritalStatus ?? "",
      address: ae_object.address ?? "",
      mail: ae_object.mail ?? "",
      phone: ae_object.phone ?? "",
      idUser: ae_object.idUser ?? "",
      status: ae_object.status ?? null,
    }),
  }
  const data = await FetchData(BASE_URL_CUSTOMER, "save", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export { SaveCustomer }
