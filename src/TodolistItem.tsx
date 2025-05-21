import { useState, KeyboardEvent, ChangeEvent } from "react"
import { FilterValues, Task } from "./App"
import { Button } from "./Button"


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
}

export const TodolistItem = ({ todolistId, title, tasks, date, filter, createTask, delTask, changeTaskStatus, changeFilter, deleteTodolist }: Props) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createTask(trimmedTaskTitle, todolistId)
        } else {
            setError('Title is required!!!')
        }
        setTaskTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isBtnDisable) {
            createTaskHandler()
        }
    }
    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const isBtnDisable = !taskTitle || taskTitle.length > 10

    return (
        <div className="todolist">
            <h3>
                {title}
                <Button classes="deleteTodolist" title='x' onClick={() => deleteTodolist(todolistId)}/>
            </h3>
            <div>
                <input
                    className={!!error ? 'task-input-error' : ''}
                    placeholder="Enter title"
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={createTaskOnKeyDownHandler} />
                <Button
                    disabled={isBtnDisable}
                    title="+"
                    onClick={createTaskHandler} />
                {error && <div style={{color: 'red'}}>{error}</div>}
                {taskTitle && <div>Max title length is 10 charters</div>}
                {taskTitle.length > 10 && <div style={{ color: 'red' }}>Title length is too long</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul className="tasks">

                    {tasks.map(task => {

                        const deleteTaskHandler = () => delTask(task.id, todolistId)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)

                        return (
                            <li key={task.id} className="task">
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                                <Button onClick={deleteTaskHandler} title="x" />
                            </li>
                        )
                    })}

                </ul>
            )}

            <div>
                <Button classes={filter === 'all' ? 'filter-btn-active' : ''} title="All" onClick={() => changeFilter('all', todolistId)} />
                <Button classes={filter === 'active' ? 'filter-btn-active' : ''} title="Active" onClick={() => changeFilter('active', todolistId)} />
                <Button classes={filter === 'completed' ? 'filter-btn-active' : ''} title="Completed" onClick={() => changeFilter('completed', todolistId)} />
            </div>
            <div>{date}</div>
        </div>
    )
}
