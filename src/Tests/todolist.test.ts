import {setTodoListsAC, todoListReducer} from "../Reducers/TodoListReducer";
import {v1} from "uuid";
import {TodoListDomainType} from "../AppWithRedux";
import {taskReducer} from "../Reducers/TaskReducer";

let todolistId1: string
let todolist2: string
let startState: TodoListDomainType[] = []

beforeEach(() => {

    todolistId1 = v1()
    todolist2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: todolist2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
    ]

})


test('setTodos', () => {


    let action = setTodoListsAC(startState)

    let endState = todoListReducer([], action)
    expect(endState[0].filter).toBe('All')
})
test('set todos', () => {


    let action = setTodoListsAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to learn', addedDate: '', order: 0}
    ])

    let endState = taskReducer({}, action)
    const key = Object.keys(endState)
    expect(key.length).toBe(2)
    expect(endState['1']).toEqual([])
    expect(endState['2']).toEqual([])
});