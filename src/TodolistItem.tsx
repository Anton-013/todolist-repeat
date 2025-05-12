import { useState, KeyboardEvent, ChangeEvent } from "react"
import { FilterValues, Task } from "./App"
import { Button } from "./Button"


type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: FilterValues
    createTask: (title: string) => void
    delTask: (id: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    changeFilter: (value: FilterValues) => void
}

export const TodolistItem = ({ title, tasks, date, filter, createTask, delTask, changeTaskStatus, changeFilter }: Props) => {

    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isBtnDisable) {
            createTaskHandler()
        }
    }
    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const isBtnDisable = !taskTitle || taskTitle.length > 10

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    placeholder="Enter title"
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={createTaskOnKeyDownHandler} />
                <Button
                    disabled={isBtnDisable}
                    title="+"
                    onClick={createTaskHandler} />
                {taskTitle && <div>Max title length is 10 charters</div>}
                {taskTitle.length > 10 && <div style={{ color: 'red' }}>Title length is too long</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>

                    {tasks.map(task => {

                        const deleteTaskHandler = () => delTask(task.id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                                <Button onClick={deleteTaskHandler} title="x" />
                            </li>
                        )
                    })}

                </ul>
            )}

            <div>
                <Button classes={filter === 'all' ? 'filter-btn-active' : ''} title="All" onClick={() => changeFilter('all')} />
                <Button classes={filter === 'active' ? 'filter-btn-active' : ''} title="Active" onClick={() => changeFilter('active')} />
                <Button classes={filter === 'completed' ? 'filter-btn-active' : ''} title="Completed" onClick={() => changeFilter('completed')} />
            </div>
            <div>{date}</div>
        </div>
    )
}
