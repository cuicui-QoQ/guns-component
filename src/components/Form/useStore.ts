import { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError, Rules, Values } from 'async-validator'
// import Schema, { RuleItem, ValidateError, Rules, Values } from './validator.ts'

export interface FieldDetail {
    name: string
    value: string
    rules: RuleItem[]
    isValid: boolean
    errors: ValidateError[]
}

export interface FieldsState {
    [key: string]: FieldDetail
}

export interface FormState {
    isValid: boolean
}

export enum FormActionType {
    addField = 'addField',
    updateField = 'updateField',
    updateValidateResult = 'updateValidateResult',
}

export interface FieldsAction {
    type: FormActionType
    name: string
    rules: RuleItem[]
    value: any
}
// react hooks
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: {
                    name: action.name,
                    value: action.value,
                    rules: action.rules,
                    isValid: true,
                    errors: [],
                },
            }
        case 'updateField':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    value: action.value,
                },
            }
        case 'updateValidateResult':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    isValid: action.value.isValid,
                    errors: action.value.errors,
                },
            }
        default:
            return state
    }
}

function useStore() {
    const [form, setForm] = useState<FormState>({ isValid: true })
    const [fields, dispatch] = useReducer(fieldsReducer, {})
    const validateField = async (name: string) => {
        const { value, rules } = fields[name]
        const descriptor: Rules = {
            [name]: rules,
        }
        const valueMap: Values = {
            [name]: value,
        }

        const validator = new Schema(descriptor)
        let isValid = true
        let errors: ValidateError[] = []
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false
            const err = e as any
            // const { errors, fields } = err
            errors = e?.errors
        } finally {
            console.log('isValid', isValid)
            dispatch({
                type: FormActionType.updateValidateResult,
                name: name,
                value: {
                    isValid,
                    errors,
                },
                rules,
            })
        }
    }

    return { fields, dispatch, form, setForm, validateField }
}

export default useStore
