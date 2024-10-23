import { BASE_URL_SALE } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { RemoveProductsOutputInterface } from "@interfaces/output-Interfaces/sale/remove-products-output-interface"
import { RemoveProductsResponseInterface } from "@interfaces/response-interfaces/sale/remove-products-response-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function RemoveProducts(ae_object: RemoveProductsOutputInterface) {
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
      storeNumber: ae_object.storeNumber ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      clientNit: ae_object.clientNit ?? "",
      idUser: ae_object.idUser ?? "",
      localDate: ae_object.localDate ?? "",
      pos: ae_object.pos ?? "",
      products: ae_object.products.map((item) => ({
        sku: item.sku ?? "",
        value: item.value ?? 0,
      })),
    }),
  }

  let data: RemoveProductsResponseInterface = await FetchData(BASE_URL_SALE, "removeProducts", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export default RemoveProducts
