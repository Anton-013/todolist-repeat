import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export const App = () => {

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ])

  const [filter, setFilter] = useState<FilterValues>("all")

  const createTask = (title: string) => {
    setTasks([{id: v1(), title, isDone: false}, ...tasks])
  }

  const delTask = (id: string) => {
    const newTasks = tasks.filter(task => {
      return task.id !== id
    })
    setTasks(newTasks)
  }

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
    setTasks(newTasks)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  let filteredTasks: Task[] = tasks
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone)
  } if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone)
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        date="23.04.2025"
        filter={filter}
        createTask={createTask}
        delTask={delTask}
        changeTaskStatus={changeTaskStatus}
        changeFilter={changeFilter} />
    </div>
  )
}
