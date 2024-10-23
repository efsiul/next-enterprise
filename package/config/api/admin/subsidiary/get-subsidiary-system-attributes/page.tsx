import { BASE_URL_ADMINISTRATION_SUBSIDIARY_SYS_ATRIB } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { GetSubsidiarySysAttribOutputInterface } from "@interfaces/output-Interfaces/admin/get-subsidiary-sys-attrib-output-interface"
import { GetSubsidiarySysAttribResponseInterface } from "@interfaces/response-interfaces/admin/get-subsidiary-sys-attrib-response-interface"
import { GetToken } from "@package/config/api/admin/auth/get-token/page"
import i18n from "@package/utils/language/i18n"
import { deleteKeyApi, deleteUser } from "@utils/utilities"

async function GetSubsidiarySystemAttributs(ae_object: GetSubsidiarySysAttribOutputInterface) {
  try {
    const token = await GetToken()

    if (token === "") {
      return new ReturnService("", false, i18n.t("errorTokenAPI"), 102)
    }

    const options: RequestInit = {
      method: "post",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        lng: i18n.language,
      },
      body: JSON.stringify({
        id: ae_object.id ?? "",
        idSubsidiary: ae_object.idSubsidiary ?? 0,
        idCompany: ae_object.idCompany ?? "",
        name: ae_object.name ?? "",
        value: ae_object.value ?? "",
        type: ae_object.type ?? "",
        typeValue: ae_object.typeValue ?? "",
        idUser: ae_object.idUser ?? "",
        active: ae_object.active ?? null,
        page: ae_object.page ?? 0,
        size: ae_object.size ?? 0,
      }),
    }

    const data: GetSubsidiarySysAttribResponseInterface = await FetchData(
      BASE_URL_ADMINISTRATION_SUBSIDIARY_SYS_ATRIB,
      "all",
      options
    )

    if (data.correct && data.object) {
      return data.object
    } else {
      deleteKeyApi()
      deleteUser()
      return data
    }
  } catch (error) {
    deleteKeyApi()
    deleteUser()
    return { correct: false, message: i18n.t("errorUnexpected"), errorCode: 500, object: null }
  }
}

export { GetSubsidiarySystemAttributs }
