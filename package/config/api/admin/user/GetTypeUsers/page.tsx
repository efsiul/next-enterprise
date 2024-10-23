import { BASE_URL_ADMINISTRATION_TYPE_USER } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { GetAllTypeUserOutPutInterface } from "@interfaces/output-Interfaces/admin/get-all-type-user-output-interface"
import { GetAllTypeUserResponseInterface } from "@interfaces/response-interfaces/admin/get-all-type-user-response-interface"
import i18n from "@package/utils/language/i18n"
import { GRID_SIZE } from "@utils/constants"
import { getKeyApi } from "@utils/utilities"

const BASE_URL_LANGUAGE = i18n.language

/**
 * Fetches a list of user types from the administration API.
 *
 * @param {GetAllTypeUserOutPutInterface} ae_object - The input object containing query parameters.
 * @returns {Promise<GetAllTypeUserResponseInterface>} A promise that resolves to the response object containing user types.
 *
 * The function performs the following steps:
 * 1. Retrieves the API token using `getKeyApi()`.
 * 2. Validates the token and returns an error response if the token is invalid.
 * 3. Sets default values for `size` and `page` if they are not provided in `ae_object`.
 * 4. Constructs the request options including method, headers, and body.
 * 5. Sends a POST request to the `BASE_URL_ADMINISTRATION_TYPE_USER` endpoint.
 * 6. Returns the response object based on the success or failure of the request.
 *
 * @example
 * const ae_object = {
 *   id: "123",
 *   name: "Admin",
 *   idCompany: "456",
 *   idSubsidiary: 1,
 *   isActive: true,
 *   size: 10,
 *   page: 1
 * };
 *
 * GetTypeUsers(ae_object).then(response => {
 *   if (response.correct) {
 *   } else {
 *     console.error("Error fetching user types:", response.message);
 *   }
 * });
 */
async function GetTypeUsers(ae_object: GetAllTypeUserOutPutInterface): Promise<GetAllTypeUserResponseInterface> {
  const token = getKeyApi()
  if (token === "") {
    return { correct: false, message: i18n.t("errorTokenAPI"), errorCode: 102, object: null }
  }

  if (ae_object.size == null || ae_object.size <= 0) {
    ae_object.size = GRID_SIZE
  }
  if (ae_object.page == null || ae_object.page <= 0) {
    ae_object.page = 0
  }

  const options = {
    method: "post",
    mode: "cors" as RequestMode,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      lng: BASE_URL_LANGUAGE,
    },
    body: JSON.stringify({
      id: ae_object.id ?? "",
      name: ae_object.name ?? "",
      idCompany: ae_object.idCompany ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      isActive: ae_object.isActive ?? true,
      size: ae_object.size,
      page: ae_object.page,
    }),
  }

  const response = await FetchData<any>(BASE_URL_ADMINISTRATION_TYPE_USER, "all", options)

  if (response.correct) {
    return {
      correct: true,
      message: "OK",
      errorCode: 0,
      object: response.object,
    }
  } else {
    return {
      correct: false,
      message: response.message,
      errorCode: response.errorCode,
      object: null,
    }
  }
}
export { GetTypeUsers }
