import { v1 } from "uuid";
import { TasksState } from "../App";

// export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

const initialState: TasksState = {

}

type ActionType =
    | { type: 'create_todolist'; payload: { id: string } }
    | { type: 'delete_todolist'; payload: { id: string } }
    | { type: 'delete_task'; payload: { taskId: string; todolistId: string } }
    | { type: 'create_task'; payload: { title: string, todolistId: string } }

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType) => {
    switch (action.type) {
        case 'create_todolist': {
            const { id } = action.payload
            return { ...tasks, [id]: [] }
        }
        case 'delete_todolist': {
            const { id } = action.payload
            delete tasks[id]
            return { ...tasks }
        }
        case 'delete_task': {
            const { taskId, todolistId } = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) }
        }
        case 'create_task': {
            const { title, todolistId } = action.payload
            return { ...tasks, [todolistId]: [...tasks[todolistId], { id: v1(), title, isDone: false }] }
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = (payload: { taskId: string, todolistId: string }) => ({
    type: 'delete_task',
    payload
} as const)

export const createTaskAC = (payload: { title: string, todolistId: string }) => ({
    type: 'create_task',
    payload
} as const)