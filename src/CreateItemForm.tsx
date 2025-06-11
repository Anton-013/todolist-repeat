import { Button, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddTaskIcon from '@mui/icons-material/AddTask';

type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({ createItem }: Props) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createItem(taskTitle)
        } else {
            setError(true)
        }
        setTaskTitle("")
    }


    const onChangeSetTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle && taskTitle.length <= 10) {
            createTaskHandler()
        }
    }

    return (
        <div>
            <TextField
                variant="outlined"
                size="small"
                value={taskTitle}
                error={error}
                placeholder="Task title is required"
                onChange={onChangeSetTitleHandler}
                onKeyDown={onKeyDownCreateItemHandler}
            />
            <Button disabled={!Boolean(taskTitle) || taskTitle.length > 10} sx={{marginLeft: '5px'}} onClick={createTaskHandler} >
                <AddTaskIcon />
            </Button>
            {taskTitle && taskTitle.length <= 10 && <div>Title shoud be max 10 charters</div>}
            {taskTitle.length > 10 && <div style={{ color: "red" }}>Max length title</div>}
        </div>
    )
}