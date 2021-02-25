import {Dispatch} from "redux";
import {setApiStatusAC} from "./appReducer";
import {loginApi, LoginParamsType} from "../LoginApi";
import {handleServerAppError, handleServerNetworkError} from "../error-utils";

type ActionsType =
    |SetApiStatusACType

export type LoginInitialStateType = {
    isLoginIn: boolean
}


const initialState: LoginInitialStateType = {isLoginIn: false}

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'LogIn':
            return {...state, isLoginIn: action.value}

        default:
            return state
    }
}


export const logInTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setApiStatusAC('loading'))
        let res = await loginApi.signIn(data)
        if (res.data.resultCode === 0) {
            dispatch(logInAC(true))
            dispatch(setApiStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const logInAC = (value: boolean) => {
    return {
        type: "LogIn",
        value
    } as const
}

type SetApiStatusACType = ReturnType<typeof logInAC>


export const logOutTC = () => async (dispatch: Dispatch) => {
    debugger
    try {
        let res = await loginApi.signOut()
        if (res.data.resultCode === 0) {
            dispatch(logInAC(false))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }

}