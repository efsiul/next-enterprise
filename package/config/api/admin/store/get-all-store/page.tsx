import { BASE_URL_ADMINISTRATION_STORE } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { GetAllStoreOutputInterface } from "@interfaces/output-Interfaces/admin/get-all-store-output-interface"
import { GetAllStoreResponseInterface } from "@interfaces/response-interfaces/admin/get-all-store-response-interface"
import i18n from "@package/utils/language/i18n"
import { GRID_SIZE } from "@utils/constants"
import { getKeyApi } from "@utils/utilities"

async function GetAllStore(ae_object: GetAllStoreOutputInterface) {
  const token = getKeyApi()
  if (!token) {
    return { correct: false, message: i18n.t("errorTokenAPI"), errorCode: 102, object: null }
  }

  if (ae_object.size === null || ae_object.size <= 0) {
    ae_object.size = GRID_SIZE
  }
  if (ae_object.page === null || ae_object.page <= 0) {
    ae_object.page = 0
  }

  const options = {
    method: "post",
    mode: "cors" as RequestMode,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
      lng: i18n.language,
    },
    body: JSON.stringify({
      id: ae_object.id ?? "",
      name: ae_object.name ?? 0,
      numberStore: ae_object.numberStore ?? "",
      idCompany: ae_object.idCompany ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      state: ae_object.state ?? null,
      size: ae_object.size,
      page: ae_object.page,
    }),
  }

  const data: GetAllStoreResponseInterface = await FetchData(BASE_URL_ADMINISTRATION_STORE, "all", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export { GetAllStore }
