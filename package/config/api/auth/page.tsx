import { BASE_URL_AUTHENTICATION } from "@api/api-path"
import { FetchData } from "@api/fetch-data"

/**
 * Authenticates a user with the provided username and password.
 *
 * @param {string} ae_user - The username of the user.
 * @param {string} ae_password - The password of the user.
 * @returns {Promise<string>} A promise that resolves to the authentication token if successful,
 *                            or an error message if authentication fails.
 *
 * @throws {Error} If there is an issue with the authentication process.
 */
async function auth(ae_user: string, ae_password: string): Promise<string> {
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: ae_user,
      password: ae_password,
    }),
  }

  const data = await FetchData<{ token: string }>(BASE_URL_AUTHENTICATION, "login", options)

  if (data.correct) {
    if (data.object) {
      return data.object.token
    } else {
      console.error("Error: data.object is null or undefined")
      return "error en la autenticación"
    }
  } else {
    console.error("Error en la autenticación:", data.message)
    return "error en la autenticación, mensaje: " + data.message
  }
}

export { auth }
