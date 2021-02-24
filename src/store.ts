import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {taskReducer} from "./Reducers/TaskReducer";
import {todoListReducer} from "./Reducers/TodoListReducer";
import {appReducer} from "./Reducers/appReducer";
import {loginReducer} from "./Reducers/loginReduce";

/*export type AppRootState = {
    todoLists: TodosType[]
    tasks: TodoTaskType
}*/
export type AppRootState = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: taskReducer,
    app: appReducer,
    auth:loginReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store