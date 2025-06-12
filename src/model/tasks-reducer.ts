import { TasksState } from "../App";
import { CreateTodolistActionType, DeleteTodolistActionType } from "./todolists-reducer";


const initialState: TasksState = {

}

type ActionType = DeleteTodolistActionType | CreateTodolistActionType

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType) => {
    switch (action.type) {
        case 'create_todolist': {
            const { id } = action.payload
            return { ...tasks, [id]: [] }
        }
        case 'delete_todolist': {
            const { id } = action.payload
            delete tasks[id]
            return {...tasks}
        }
        default:
            return tasks
    }
}