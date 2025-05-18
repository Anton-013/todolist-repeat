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

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [todolistId: string]: Task[]
}

export const App = () => {

  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Beer", isDone: false },
      { id: v1(), title: "Cheeps", isDone: false },
      { id: v1(), title: "Cola", isDone: false },
    ]
  })

  const createTask = (title: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], { id: v1(), title, isDone: false }] })
  }

  const delTask = (id: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id) })
  }

  const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: newStatus } : t) })
  }

  const changeFilter = (filter: FilterValues, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }

  const todolistComponents = todolists.map(tl => {

    let filteredTasks = tasks[tl.id]
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    } if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <TodolistItem
        key={tl.id}
        todolistId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}
        createTask={createTask}
        delTask={delTask}
        changeTaskStatus={changeTaskStatus}
        changeFilter={changeFilter}
        deleteTodolist={deleteTodolist} />
    )
  })



  return (
    <div className="app">
      {todolistComponents}
    </div>
  )
}
