import {TaskStateType} from "../AppWithRedux";
import {AddTodoListACType, RemoveTodoListACType, setApiEntityStatusAC, SetTodoListsACType} from "./TodoListReducer";
import {taskListsApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "../store";
import {setApiStatusAC, setErrorAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../error-utils";


export type TaskActionType =
    | RemoveTaskACType
    | UpdateTaskACType
    | AddTaskACType
    | RemoveTodoListACType
    | AddTodoListACType
    | SetTodoListsACType
    | SetTasksType

export const taskReducer = (state: TaskStateType = {}, action: TaskActionType): TaskStateType => {
    switch (action.type) {

        case 'Remove Task': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {...stateCopy}

        }
        case 'AddTask': {
            const stateCopy = {...state}
            stateCopy[action.task.todoListId] = [...stateCopy[action.task.todoListId], action.task]
            return {...stateCopy}
        }
        case
        'Update-Task': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                ...action.model
            } : t)
            return {...stateCopy}
        }
        case'AddTodoList': {
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return {...stateCopy}

        }
        case'RemoveTodoList': {
            const stateCopy = {...state}
            delete stateCopy[action.todoId]
            return {...stateCopy}
        }
        case 'SetTodoLists': {
            let stateCopy = {...state}
            action.todoLists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        }
        case 'SetTasks': {
            /*   debugger*/
            const stateCopy = {...state}
            stateCopy[action.todoId] = action.tasks
            return stateCopy
        }

        default :
            return state
    }

}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'Remove Task',
        taskId,
        todolistId
    } as const
}
type RemoveTaskACType = ReturnType<typeof removeTaskAC>


export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainModelTaskType) => {
    return {
        type: 'Update-Task',
        taskId,
        todolistId,
        model
    } as const
}
type UpdateTaskACType = ReturnType<typeof updateTaskAC>


export const addTaskAC = (task: TaskType) => {
    return {
        type: 'AddTask',
        task
    } as const
}
type AddTaskACType = ReturnType<typeof addTaskAC>

export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => {
    return {
        type: 'SetTasks',
        todoId,
        tasks
    } as const
}
type SetTasksType = ReturnType<typeof setTasksAC>

export const fetchTaskTC = (todoId: string) => {

    return (dispatch: Dispatch) => {
        dispatch(setApiStatusAC('loading'))
        /*debugger*/
        taskListsApi.get(todoId)
            .then((res) => {
                /* debugger*/
                dispatch(setTasksAC(todoId, res.data.items))
                dispatch(setApiStatusAC('idle'))
            })
    }
}

export const addTaskTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setApiStatusAC('loading'))
        taskListsApi.post(todoId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setApiStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTaskTC = (taskId: string, todoId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            {
                dispatch(setApiStatusAC('loading'))
                dispatch(setApiEntityStatusAC(todoId, 'loading'))

                let res = await taskListsApi.delete(todoId, taskId)
                if (res) {
                    dispatch(removeTaskAC(taskId, todoId))
                    dispatch(setApiStatusAC('idle'))
                    dispatch(setApiEntityStatusAC(todoId, 'idle'))
                }
            }
        } catch (err) {
        } finally {
        }
    }
}
//а тут мы уже возвращаем созданную таску с сервера
//мы вводем в поле инпута название такски она создается на сервере

export type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainModelTaskType) => {
    //санка может принимать параметр гетстейт это ф-ия которая ничего не принимает и возвращает стейт
    return (dispatch: Dispatch, getState: () => AppRootState) => {
//мы с помощью файнда находим эту таску и формеруем объект типа таски и кладем в него прежние параметры
        //а тайтл меняем на тот что вводим(аргумент ф-ии title)

        const task = getState().tasks[todoId].find(t => t.id === taskId)
        if (!task) {
            return console.warn('pzdc')
        }

        const apiModel: UpdateTaskType =
            {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
        dispatch(setApiStatusAC('loading'))
        taskListsApi.put(todoId, taskId, apiModel)//передаем в запрос наш модел
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, todoId, domainModel))
                    dispatch(setApiStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })

    }
}

