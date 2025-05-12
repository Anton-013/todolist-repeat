

type Props = {
    title: string
    onClick?: () => void
    disabled?: boolean
    classes?: string
}

export const Button = ({ title, onClick, disabled, classes }: Props) => {
    return (
        <button className={classes} disabled={disabled} onClick={onClick}>{title}</button>
    )
}