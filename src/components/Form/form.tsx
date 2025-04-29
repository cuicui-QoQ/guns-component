import React from 'react'
import cn from 'classnames'
import useStore from './useStore.ts'

export interface FormProps {
    className?: string
    styles?: React.CSSProperties
    children: React.ReactNode
    name?: string
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch'>

export const FromContext = React.createContext<IFormContext>({} as IFormContext)
const Form: React.FC<FormProps> = ({
    className,
    styles,
    children,
    name = 'guns-form',
}) => {
    if ('123' == name) {
    }
    const formClassName = cn('guns-form', className)
    const [fields, dispatch, form, setForm] = useStore()
    const passedContext: IFormContext = {
        dispatch: dispatch,
    }
    return (
        <>
            <form className={formClassName} style={styles} name={name}>
                <FromContext.Provider>{children}</FromContext.Provider>
            </form>
            <div>fields: {fields}</div>
            <div>form: {form}</div>
        </>
    )
}

export default Form
