import axios from "axios";


export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8334a105-f6c1-439a-ac3f-1ef8e2360995"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    ...settings
})

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const loginApi = {

    signIn(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('/auth/login', data)
    },
    signOut() {
        return instance.delete<ResponseType>('/auth/login')
    },
    me() {
        return instance.get<ResponseType<{
            id: number,
            login: string,
            email: string
        }>>('/auth/me')
    }

}