import { ChangeEvent } from "react"
import { FilterValues, Task } from "./App"
// import { Button } from "./Button"
import { CreateItemForm } from "./CreateItemForm"
import { EditableSpan } from "./EditableSpan"
import Button from "@mui/material/Button"
import { IconButton } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';


type Props = {
    todolistId: string
    title: string
    tasks: Task[]
    date?: string
    filter: FilterValues
    createTask: (title: string, todolistId: string) => void
    delTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeFilter: (value: FilterValues, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodolistItem = ({ todolistId, title, tasks, date, filter, createTask, delTask, changeTaskStatus, changeFilter, deleteTodolist, changeTaskTitle, changeTodolistTitle }: Props) => {

    const createTaskHandler = (taskTitle: string) => {
        createTask(taskTitle, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    return (
        <div className="todolist">
            <h3>
                <EditableSpan changeTitle={changeTodolistTitleHandler} title={title} />
                <IconButton onClick={() => deleteTodolist(todolistId)}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler} />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul className="tasks">

                    {tasks.map(task => {

                        const deleteTaskHandler = () => delTask(task.id, todolistId)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                        const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)

                        return (
                            <li key={task.id} className="task">
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title} />
                                <IconButton onClick={deleteTaskHandler}>
                                    <ClearIcon />
                                </IconButton>
                            </li>
                        )
                    })}

                </ul>
            )}

            <div>
                <Button
                    variant="contained"
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilter('all', todolistId)}
                >
                    all
                </Button>
                <Button
                    sx={{ m: '0 2px' }}
                    variant="contained"
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilter('active', todolistId)}
                >
                    active
                </Button>
                <Button
                    variant="contained"
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilter('completed', todolistId)}
                >
                    completed
                </Button>

            </div>
            <div>{date}</div>
        </div>
    )
}
