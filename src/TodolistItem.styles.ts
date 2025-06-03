
import { CSSProperties } from "react";

export const getListItemSx = (isDone: boolean): CSSProperties => ({
    justifyContent: 'space-between',
    opacity: isDone ? '0.5' : '1',
    fontWeight: isDone ? 'normal' : 'bold',
})