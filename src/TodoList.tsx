import React, {useEffect} from 'react';
import './App.css';
import {FilterType, TaskStateType, TodoListDomainType} from "./AppWithRedux";
import {InputComponent} from "./InputComponent";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addTaskTC, fetchTaskTC} from "./Reducers/TaskReducer";
import {changeTodoListFilterAC, changeTodoListTitleTC, removeTodoListTC} from "./Reducers/TodoListReducer";
import {Task} from './Task';
import {TaskStatuses} from "./tasks-api";
import {Redirect} from "react-router-dom";


export type TodoListPropsType = {
    todolist: TodoListDomainType
    demo?: boolean

}

export const TodoList = React.memo(({todolist, demo}: TodoListPropsType) => {

    const task = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo ) {
            return
        }
        dispatch(fetchTaskTC(todolist.id))
    }, [dispatch, todolist.id, demo])



    let tasks = task[todolist.id]

    if (todolist.filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New) // кладем копию в копию что бы не изменять оригинал
    }

    if (todolist.filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    if (todolist.filter === 'All') {
        tasks = tasks.filter(t => t)
    }

    const removeTodoList = () => {
        dispatch(removeTodoListTC(todolist.id))
    }

    const addTask = (title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleTC(todolist.id, title))
    }

    const changeTodoListFilter = (todoFilter: FilterType) => {
        dispatch(changeTodoListFilterAC(todolist.id, todoFilter))
    }



    return (

        <div>
            <div key={todolist.id} className="App">
                {/*<h3 style={{display: "inline-block"}}>{props.todoTitle}</h3>*/}
                <EditableSpan title={todolist.title} changeTitle={changeTodoListTitle}/>
                <button disabled={todolist.apiStatus === 'loading'}
                        onClick={removeTodoList}>x
                </button>
                <InputComponent addItem={addTask}/>
                {

                    tasks.map(t => {
                            return (
                                <Task
                                    key={t.id}
                                    task={t}
                                    todoId={todolist.id}
                                    todoStatus={todolist.apiStatus}
                                />
                            )
                        }
                    )}
                <button style={todolist.filter === 'All' ? {backgroundColor: "aquamarine"} : {}}
                        onClick={() => {
                            changeTodoListFilter('All')
                        }}>All
                </button>
                <button style={todolist.filter === 'Active' ? {backgroundColor: "aquamarine"} : {}} onClick={() => {
                    changeTodoListFilter('Active')
                }}> Active
                </button>
                <button style={todolist.filter === 'Completed' ? {backgroundColor: "aquamarine"} : {}} onClick={() => {
                    changeTodoListFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
})


