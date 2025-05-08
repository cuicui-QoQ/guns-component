class Schema {
    constructor(descriptor: Rules) {}

    validate(valueMap: Values) {
        return new Promise((res, rej) => {
            res(valueMap)
        })
    }
}

export interface RuleItem {
    type?: RuleType
}

export declare type RuleType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'pattern'
    | 'any'
export declare type Value = any
export declare type Values = Record<string, Value>
export declare type Rule = RuleItem | RuleItem[]
export declare type Rules = Record<string, Rule>
export type ValidateError = {
    message?: string
    fieldValue?: Value
    field?: string
}

export default Schema
