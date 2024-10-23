import { BASE_URL_ADMINISTRATION_USER } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { GetToken } from "@package/config/api/admin/auth/get-token/page"
import i18n from "@package/utils/language/i18n"
import { encrypt } from "@utils/utilities"

const BASE_URL_LANGUAGE = i18n.language

interface AeOptions {
  id?: string
  idSubsidiary?: number
  odlPassword?: string
  password?: string
}

/**
 * Resets the password for a user.
 *
 * @param {AeOptions} ae_options - The options for the reset password request.
 * @returns {Promise<ReturnService>} A promise that resolves to a ReturnService object indicating the result of the operation.
 *
 * @throws {Error} If there is an issue with fetching the token or making the API request.
 *
 * The function performs the following steps:
 * 1. Retrieves an authentication token using the `GetToken` function.
 * 2. If the token is empty, returns a `ReturnService` object indicating an error.
 * 3. Constructs the request options, including headers and body, for the API call.
 * 4. Makes a POST request to the `user/resetPassword` endpoint of the administration API.
 * 5. If the response indicates success, returns the response object as a `ReturnService` object.
 * 6. Otherwise, returns the original response data.
 */
async function ResetPassword(ae_options: AeOptions) {
  const token = await GetToken()
  if (token === "") {
    return new ReturnService("", false, i18n.t("errorTokenAPI"), 102)
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
      id: ae_options.id ?? "",
      idSubsidiary: ae_options.idSubsidiary ?? 0,
      odlPassword: encrypt(ae_options.odlPassword ?? "") ?? "",
      password: encrypt(ae_options.password ?? "") ?? "",
    }),
  }

  const data = await FetchData(BASE_URL_ADMINISTRATION_USER, "user/resetPassword", options)

  let result = data
  if (data.correct) {
    result = data.object as ReturnService<unknown>
  }

  return result
}

export { ResetPassword }
