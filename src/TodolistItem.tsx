import { FilterValues, Task } from "./App"
import { Button } from "./Button"


type Props = {
    title: string
    tasks: Task[]
    date?: string
    delTask: (id: number) => void
    changeFilter: (value: FilterValues) => void
}

export const TodolistItem = ({ title, tasks, date, delTask, changeFilter }: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title="+" />
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
