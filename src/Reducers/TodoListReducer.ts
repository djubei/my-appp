import {FilterType, TodoListDomainType} from "../AppWithRedux";
import {todoListsApi, TodoListType} from "../todoLists-api";
import {Dispatch} from "redux";
import {appStatusType, setApiStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../error-utils";


export type TodoActionType =
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType
    | RemoveTodoListACType
    | AddTodoListACType
    | SetTodoListsACType
    | SetApiStatusACType

let initialState: TodoListDomainType[] = []

export const todoListReducer = (state: TodoListDomainType[] = initialState, action: TodoActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "ChangeTodoListTitle": {
            let stateCopy = [...state]
            stateCopy = state.map(t => t.id === action.todoId ? {...t, title: action.todoTitle} : t)
            return [...stateCopy]

        }
        case "ChangeTodoListFilter": {
            let stateCopy = [...state]
            stateCopy = state.map(t => t.id === action.todoId ? {...t, filter: action.todoFilter} : t)
            return [...stateCopy]
        }
        case 'RemoveTodoList': {
            let stateCopy = [...state]
            stateCopy = state.filter(t => t.id !== action.todoId)
            return [...stateCopy]

        }
        case 'AddTodoList': {
            let stateCopy = [...state]
            return [...stateCopy, {...action.todoList, filter: 'All', apiStatus: 'idle'}]
        }
        case "SetApiEntityStatus": {
            let stateCopy = [...state]
            stateCopy = stateCopy.map(t => t.id === action.todoId ? {...t, filter: "All", apiStatus: action.status} : t)
            return stateCopy
        }
        case 'SetTodoLists': {
            let stateCopy = [...state]
            stateCopy = action.todoLists.map(t => ({...t, filter: "All", apiStatus: 'idle'}))
            return stateCopy
        }
        default:
            return state
    }
}

export const changeTodoListTitleAC = (todoId: string, todoTitle: string) => {
    return {
        type: 'ChangeTodoListTitle',
        todoTitle,
        todoId
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListFilterAC = (todoId: string, todoFilter: FilterType) => {
    return {
        type: 'ChangeTodoListFilter',
        todoId,
        todoFilter
    } as const
}

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todoId: string) => {
    return {
        type: 'RemoveTodoList',
        todoId
    } as const
}
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: 'AddTodoList',
        todoList
    } as const
}
export type AddTodoListACType = ReturnType<typeof addTodoListAC>


export const setTodoListsAC = (todoLists: Array<TodoListType>) => {
    return {
        type: 'SetTodoLists',
        todoLists
    } as const
}
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>


export const fetchTodoListTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setApiStatusAC('loading'))
        todoListsApi.get()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setApiStatusAC('idle'))
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
}


// Мы берем тудулистАпи удаляем через него тудулист на сервере
// отправляем запрос с нужным айди для удаления сам метод axios.delete позволяет нам удалить тудулист
// так как мы даем ему ссылку где он должен удалить
// как будто бы на сервере реальизован свой редьюсер нам нужно только данные туда послать и команду (axios.delete)
// после чего мы получаем резолв с измененным стейтом
// и диспатчим через фронт редьюсер уже измененный стейт для отрисовки

export const removeTodoListTC = (todoId: string) => {// запуск ф-ии с передачей аргумента
    return (dispatch: Dispatch) => {// ждет пока нам вернется объект из экшен крейтора
        dispatch(setApiStatusAC('loading'))
        dispatch(setApiEntityStatusAC(todoId, 'loading'))
        todoListsApi.delete(todoId)// послали запрос на сервер что бы удалить тудулист по айди
            .then((res) => { // ждем возвращения резолва(стейта) и уже полученный стейт берем в экшн
                dispatch(removeTodoListAC(todoId))// диспатчим наш обновленный стейт в ui
                dispatch(setApiStatusAC('idle'))
                dispatch(setApiEntityStatusAC(todoId, 'idle'))
            })
    }
}


export const changeTodoListTitleTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setApiStatusAC('loading'))
        todoListsApi.put(todoId, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(todoId, title))
                dispatch(setApiStatusAC('idle'))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setApiStatusAC('loading'))
        todoListsApi.post(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setApiStatusAC('idle'))
            })
    }
}

export const setApiEntityStatusAC = (todoId: string, status: appStatusType) => {
    return {
        type: 'SetApiEntityStatus',
        todoId,
        status
    } as const
}
export type SetApiStatusACType = ReturnType<typeof setApiEntityStatusAC>






















