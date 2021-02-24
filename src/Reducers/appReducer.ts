import {Dispatch} from "redux";
import {loginApi} from "../LoginApi";
import {logInAC} from "./loginReduce";

type ActionsType =
    | errorStatusAcType
    | SetApiStatusACType
    | setApiInitializedACType

export type InitialStateType = {
    status: appStatusType,
    error: string | null,
    initialized: boolean
}

export type appStatusType = 'failed' | 'succeeded' | 'idle' | 'loading'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SETT-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: action.initialized}
        default:
            return {...state}
    }

}

export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SETT-ERROR',
        error
    } as const
}
type errorStatusAcType = ReturnType<typeof setErrorAC>

export const setApiStatusAC = (status: appStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
type SetApiStatusACType = ReturnType<typeof setApiStatusAC>


export const setAppInitializedAC = (initialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        initialized
    } as const
}
type setApiInitializedACType = ReturnType<typeof setAppInitializedAC>

export const initializeTC = () => async (dispatch: Dispatch) => {
    try {

        let res = await loginApi.me()
        if (res.data.resultCode === 0) {
            dispatch(logInAC(true))

        } else {

        }
        dispatch(setAppInitializedAC(true))
    } catch (error) {

    }
}

