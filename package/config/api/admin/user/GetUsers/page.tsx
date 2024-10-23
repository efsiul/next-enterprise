import { BASE_URL_ADMINISTRATION_USER } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { GetUsersOutputInterface } from "@interfaces/output-Interfaces/admin/get-users-output-interface"
import { GetUsersAllResponseInterface } from "@interfaces/response-interfaces/admin/get-all-users-response-interface"
import { GRID_SIZE } from "@utils/constants"
import i18n from "@package/utils/language/i18n"
import { getKeyApi } from "@utils/utilities"

/**
 * Fetches all users based on the provided filter criteria.
 *
 * @param {GetUsersOutputInterface} ae_object - The filter criteria for fetching users.
 * @returns {Promise<GetUsersAllResponseInterface>} A promise that resolves to the response containing user data.
 *
 * @throws Will throw an error if the API token is not available.
 *
 * @remarks
 * - If `ae_object.size` is null or less than or equal to 0, it defaults to `GRID_SIZE`.
 * - If `ae_object.page` is null or less than or equal to 0, it defaults to 0.
 * - The function makes a POST request to the user administration API with the provided filter criteria.
 * - The response is processed to determine if the request was successful or not.
 *
 * @example
 * ```typescript
 * const filterCriteria: GetUsersOutputInterface = {
 *   type: "admin",
 *   idSubsidiary: 1,
 *   idCompany: 2,
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   isActive: true,
 *   size: 10,
 *   page: 1
 * };
 *
 * GetUserAll(filterCriteria)
 *   .then(response => {
 *     if (response.correct) {
 *     } else {
 *       console.error("Error fetching users:", response.message);
 *     }
 *   })
 *   .catch(error => {
 *     console.error("Unexpected error:", error);
 *   });
 * ```
 */
async function GetUserAll(ae_object: GetUsersOutputInterface): Promise<GetUsersAllResponseInterface> {
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
      Authorization: "Bearer " + token,
      lng: i18n.language,
    },
    body: JSON.stringify({
      idType: ae_object.type ?? "",
      idSubsidiary: ae_object.idSubsidiary ?? 0,
      idCompany: ae_object.idCompany ?? 0,
      name: ae_object.name ?? "",
      mail: ae_object.email ?? "",
      isActive: ae_object.isActive ?? null,
      size: ae_object.size,
      page: ae_object.page,
    }),
  }

  const response = await FetchData<any>(BASE_URL_ADMINISTRATION_USER, "all", options)

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

export { GetUserAll as GetUsers }
