import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {InputComponent} from "./InputComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addTodoListTC, fetchTodoListTC} from "./Reducers/TodoListReducer";

import {TaskType} from "./tasks-api";
import {LinearProgress} from "@material-ui/core";
import {CustomizedSnackbars} from "./ErrorSnackBar";
import {appStatusType} from "./Reducers/appReducer";
import {TodoListType} from "./todoLists-api";
import {Redirect} from "react-router-dom";


export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterType
    apiStatus: appStatusType
}

type PropsType = {
    demo?: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>

}


export const AppWithRedux = React.memo(({demo}: PropsType) => {

    const status = useSelector<AppRootState, appStatusType>(state => state.app.status)
    let todoLists = useSelector<AppRootState, TodoListDomainType[]>(state => state.todoList)
    let dispatch = useDispatch()
    /*console.dir(tasks)
    console.dir(todoLists)*/

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoginIn)


    const addTodolist = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    /* useEffect(() => {
         todoListsApi.get()
             .then((res) => {
                 dispatch(setTodoListsAC(res.data))
             })
     })*/
    /* useEffect(() => {
         fetchTodoList(dispatch)
     })*/
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListTC())
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className="App">
            {status === "loading" && <LinearProgress/>}
            <CustomizedSnackbars/>
            <InputComponent addItem={addTodolist}/>
            {todoLists.map(td =>
                <TodoList
                    key={td.id}
                    todolist={td}
                />
            )}
        </div>
    );
})
