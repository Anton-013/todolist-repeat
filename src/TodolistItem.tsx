import { useState, KeyboardEvent, ChangeEvent } from "react"
import { FilterValues, Task } from "./App"
import { Button } from "./Button"


type Props = {
    title: string
    tasks: Task[]
    date?: string
    createTask: (title: string) => void
    delTask: (id: string) => void
    changeFilter: (value: FilterValues) => void
}

export const TodolistItem = ({ title, tasks, date, createTask, delTask, changeFilter }: Props) => {

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

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button onClick={deleteTaskHandler} title="x" />
                            </li>
                        )
                    })}

                </ul>
            )}

            <div>
                <Button title="All" onClick={() => changeFilter('all')} />
                <Button title="Active" onClick={() => changeFilter('active')} />
                <Button title="Completed" onClick={() => changeFilter('completed')} />
            </div>
            <div>{date}</div>
        </div>
    )
}
