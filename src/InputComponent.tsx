import React, {ChangeEvent, useCallback, useState} from 'react';


export type InputComponentPropsType = {
    addItem: (value: string) => void

}

export const InputComponent = React.memo((props: InputComponentPropsType) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }


    const AddTask = useCallback(() => {
        if (value.trim() === '') {
            setError('text is required')
        } else {
            props.addItem(value)
            setValue('')
            setError(null)
        }
    }, [props, value])

    return (
        <div><input value={value} type="text" onChange={setInputValue}/>
            <button onClick={AddTask}>+</button>
            <div>{error}</div>
        </div>
    )
})