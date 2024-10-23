import { atom } from "jotai"
import { UserResposeInterface } from "@interfaces/response-interfaces/auth/user-response-interface"

const UserAtom = atom<UserResposeInterface | null>(null)

export default UserAtom
