import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "./tasks-api";
import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskTC} from "./Reducers/TaskReducer";
import {EditableSpan} from "./EditableSpan";
import {appStatusType} from "./Reducers/appReducer";


type TaskPropsType = {
    task: TaskType
    todoId: string
    todoStatus: appStatusType
}


export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const changeTaskListTitle = (title: string) => {
        dispatch(updateTaskTC(props.todoId, props.task.id, {title}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(props.todoId, props.task.id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }

    const removeTask = useCallback((id: string) => {
        dispatch(removeTaskTC(id, props.todoId))
    }, [dispatch, props.todoId])


    return (
        <div key={props.task.id} style={props.task.status === TaskStatuses.Completed ? {opacity: 1} : {opacity: 0.5}}>
            <EditableSpan title={props.task.title} changeTitle={changeTaskListTitle}/>
            <input
                type={'checkbox'} checked={props.task.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}/>
            <button disabled={props.todoStatus === 'loading'} onClick={() => {
                removeTask(props.task.id)
            }}>x
            </button>
        </div>
    )
})