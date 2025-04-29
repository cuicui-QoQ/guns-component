import { useReducer, useState } from 'react'

export interface FieldDetail {
    name: string
    value: string
    rules: any[]
    isValid: boolean
    errors: any[]
}

export interface FieldsState {
    [key: string]: FieldDetail
}

export interface FormState {
    isValid: boolean
}

export interface FieldsAction {
    type: 'addFiled'
    name: string
    value: any
}
// react hooks
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
    switch (action.type) {
        case 'addFiled':
            return {
                ...state,
                [action.name]: {
                    name: action.name,
                    value: action.value,
                    rules: [],
                    isValid: true,
                    errors: [],
                },
            }
        default:
            return state
    }
}

function useStore() {
    const [form, setForm] = useState<FormState>({ isValid: true })
    const [fields, dispatch] = useReducer(fieldsReducer, {})
    return [fields, dispatch, form, setForm]
}

export default useStore
