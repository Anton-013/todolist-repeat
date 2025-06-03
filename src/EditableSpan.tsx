import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"


type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeTitle }: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode
                ? <TextField
                    variant="filled"
                    size="small"
                    value={newTitle}
                    autoFocus
                    onBlur={offEditMode}
                    onChange={onChangeHandler}
                />
                : <span onDoubleClick={onEditMode}>{title}</span>
            }
        </>
    )
}