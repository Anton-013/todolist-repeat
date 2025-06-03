import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'
import { CreateItemForm } from './CreateItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider } from '@mui/material'
import { NavButton } from './NavButton'
import { amber, purple } from '@mui/material/colors'

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

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title: newTitle } : t) })
  }

  const changeFilter = (filter: FilterValues, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }

  const createTodolist = (title: string) => {
    const newTodo: Todolist = {
      id: v1(),
      title,
      filter: 'all'
    }
    setTodolists([...todolists, newTodo])
    setTasks({ ...tasks, [newTodo.id]: [] })
  }

  const changeTodolistTitle = (newTitle: string, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
  }

  const todolistComponents = todolists.map(tl => {

    let filteredTasks = tasks[tl.id]
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    } if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <Grid key={tl.id}>
        <Paper elevation={7}>
          <TodolistItem
            todolistId={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            createTask={createTask}
            delTask={delTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            deleteTodolist={deleteTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle} />
        </Paper>
      </Grid>
    )
  })

  const [darkMode, setDarkMode] = useState(false)
  const theme = createTheme({
    palette: {
      primary: purple,
      secondary: amber,
      mode: darkMode ? 'dark' : 'light',
    },
  }
  )

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <Switch onChange={()=> {setDarkMode(!darkMode)}} />
              <NavButton>Sign in</NavButton>
              <NavButton>Sign out</NavButton>
              <NavButton background={theme.palette.secondary.dark}>FAQ</NavButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container sx={{ p: '15px 0' }}>
            <CreateItemForm createItem={createTodolist} />
          </Grid>
          <Grid container spacing={3}>
            {todolistComponents}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
