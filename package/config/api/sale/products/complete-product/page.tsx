import { BASE_URL_SALE_PRODUCT_SKU } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { CompleteProductOutputInterface } from "@interfaces/output-Interfaces/sale/complete-product-output-interface"
import { CompleteProductResponseInterface } from "@interfaces/response-interfaces/sale/complete-product-response-interface"
import { BASE_URL_LANGUAGE } from "@utils/constants"
import i18n from "@utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

async function CompleteProduct(ae_object: CompleteProductOutputInterface) {
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
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      sku: ae_object.sku,
    }),
  }

  let data: CompleteProductResponseInterface = await FetchData(BASE_URL_SALE_PRODUCT_SKU, "product", options)

  if (data.correct) {
    return data.object
  }

  return data
}

export default CompleteProduct
