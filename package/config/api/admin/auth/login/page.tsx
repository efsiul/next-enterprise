import { BASE_URL_ADMINISTRATION_USER } from "@api/api-path"
import { FetchData } from "@api/fetch-data"
import { ReturnService } from "@api/return-service"
import { LoginResponse } from "@interfaces/response-interfaces/auth/user-response-interface"
import { GetToken } from "@package/config/api/admin/auth/get-token/page"
import i18n from "@package/utils/language/i18n"
import { deleteKeyApi, deleteUser, encrypt, setKeyApi, setUser } from "@utils/utilities"

/**
 * Authenticates a user by their username and password.
 *
 * @param {string} ae_user - The username of the user.
 * @param {string} ae_password - The password of the user.
 * @returns {Promise<LoginResponse>} A promise that resolves to a LoginResponse object indicating the success or failure of the login attempt.
 *
 * @throws Will return an error response if the token retrieval fails, the credentials are incorrect, or an unexpected error occurs.
 */
async function Login(ae_user: string, ae_password: string): Promise<LoginResponse> {
  try {
    const token = await GetToken()

    if (!token) {
      return { correct: false, message: i18n.t("errorTokenAPI"), errorCode: 102, object: null }
    }

    ae_password = encrypt(ae_password)

    const options: RequestInit = {
      method: "post",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        lng: i18n.language,
      },
      body: JSON.stringify({
        email: ae_user,
        password: ae_password,
      }),
    }

    const data: ReturnService<any> = await FetchData(BASE_URL_ADMINISTRATION_USER, "login", options)

    if (data.correct && data.object) {
      setKeyApi(token)
      setUser(data.object.object)

      return data.object
    } else {
      deleteKeyApi()
      deleteUser()
      return {
        correct: false,
        message: data.message || i18n.t("msj_Incorrect_credentials"),
        errorCode: data.errorCode,
        object: null,
      }
    }
  } catch (error) {
    deleteKeyApi()
    deleteUser()
    return { correct: false, message: i18n.t("errorUnexpected"), errorCode: 500, object: null }
  }
}

export { Login }
