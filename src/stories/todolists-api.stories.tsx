import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../todoLists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListsApi.get()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const createTodoList = (title: string) => {
        todoListsApi.post(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>

            <input value={title} placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={() => {
                createTodoList(title)
            }}>AddTodoList
            </button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')

    const deleteTodolist = (todoId: string) => {
        todoListsApi.delete(todoId)
            .then((res) => {
                setState(res.data)
            })
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder={'title'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <button onClick={() => {
                deleteTodolist(todoId)
            }}>DeleteTodoList
            </button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [title, setTitle] = useState('')

    const updateTodolistTile = (todoListId: string, title: string) => {
        todoListsApi.put(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>

            <input value={title} placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input value={todoId} placeholder={'ID'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <button onClick={() => {
                updateTodolistTile(todoId, title)
            }}>AddTodoList
            </button>
        </div>
    </div>
}
