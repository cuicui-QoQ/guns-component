import React from 'react'
import cn from 'classnames'
import useStore from './useStore.ts'

export interface FormProps {
    className?: string
    styles?: React.CSSProperties
    children: React.ReactNode
    name?: string
    initialValues?: Record<string, any>
}

export type IFormContext = Pick<
    ReturnType<typeof useStore>,
    'dispatch' | 'fields' | 'validateField'
> &
    Pick<FormProps, 'initialValues'>

export const FormContext = React.createContext<IFormContext>({} as IFormContext)
const Form: React.FC<FormProps> = ({
    className,
    styles,
    children,
    initialValues,
    name = 'guns-form',
}) => {
    const formClassName = cn('guns-form', className)
    const { fields, dispatch, form, setForm, validateField } = useStore()
    const passedContext: IFormContext = {
        dispatch: dispatch,
        fields,
        initialValues,
        validateField,
    }
    return (
        <>
            <form className={formClassName} style={styles} name={name}>
                <FormContext.Provider value={passedContext}>
                    {children}
                </FormContext.Provider>
            </form>
            <div>fields: {JSON.stringify(fields)}</div>
            <div>form: {JSON.stringify(form)}</div>
        </>
    )
}

export default Form
