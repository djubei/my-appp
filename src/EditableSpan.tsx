import React, {ChangeEvent, FocusEvent, useState} from 'react';


export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [edit, setEdit] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    const editValueFalse = (e: FocusEvent<HTMLInputElement>) => {
        setEdit(false)
        props.changeTitle(title)

    }
    const editValueTrue = () => {
        setTitle(props.title)
        setEdit(true)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        edit ? <input onChange={changeTitle} autoFocus onBlur={editValueFalse} type={title}/> :
            <span onDoubleClick={editValueTrue}>{props.title}</span>
    )
})