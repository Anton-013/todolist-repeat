import { useRef } from "react"
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

    const taskInputRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef}/>
                <Button title="+" onClick={() => {
                    if(taskInputRef.current) {
                        createTask(taskInputRef.current.value)
                        taskInputRef.current.value = ''
                    }
                }} />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>

                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button onClick={() => delTask(task.id)} title="x" />
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
