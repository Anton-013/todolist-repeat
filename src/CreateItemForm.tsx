import { Button, IconButton } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
// import { Button } from "./Button"

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
            <input
                value={taskTitle}
                className={!!error ? "error" : undefined}
                onChange={onChangeSetTitleHandler}
                onKeyDown={onKeyDownCreateItemHandler}
            />
            <Button variant="contained" disabled={!Boolean(taskTitle) || taskTitle.length > 10} sx={{marginLeft: '5px'}} onClick={createTaskHandler} >
                <AddIcon />
            </Button>
            {/* <Button
                title="+"
                onClick={createTaskHandler}
                disabled={!Boolean(taskTitle) || taskTitle.length > 10}
            /> */}
            {!taskTitle && <div style={{ color: "red" }}>Task title is required</div>}
            {taskTitle && taskTitle.length <= 10 && <div>Title shoud be max 10 charters</div>}
            {taskTitle.length > 10 && <div style={{ color: "red" }}>Max length title</div>}
        </div>
    )
}