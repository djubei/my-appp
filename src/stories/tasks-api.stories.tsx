import React, {useState} from 'react'

import {taskListsApi, UpdateTaskType} from "../tasks-api";
import {useSelector} from "react-redux";
import {AppRootState} from "../store";
import {TaskStateType} from "../AppWithRedux";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')


    const getTask = (todoId: string) => {
        taskListsApi.get(todoId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder={'todoId'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <button onClick={() => {
                getTask(todoId)
            }}>GetTasks
            </button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [title, setTitle] = useState('')


    const createTask = (todoId: string, title: string) => {
        taskListsApi.post(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder={'TodoId'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input value={title} placeholder={'Title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>

            <button onClick={() => {
                createTask(todoId, title)
            }}>CreateTasks
            </button>
        </div>

    </div>
}
export const DeleteTaskk = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        taskListsApi.delete(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder={'TodoId'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input value={taskId} placeholder={'TaskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>

            <button onClick={deleteTask}>deleteTasks
            </button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [title, setTitle] = useState('')
    const [taskId, setTaskId] = useState('')

    let tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const task = tasks[todoId].find(t => t.id === taskId)
    if (!task) {
        return console.warn('pzdc')
    }

    const model: UpdateTaskType =
        {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

    const updateTask = () => {
        taskListsApi.put(todoId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder={'TodoId'} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input value={taskId} placeholder={'TaskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input value={title} placeholder={'Title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>

            <button onClick={updateTask}>updateTask
            </button>
        </div>
    </div>
}
