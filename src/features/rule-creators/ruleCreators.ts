import { IUseValidationRule } from "@src/hooks/useValidation";
import { IFormContext } from "@src/contexts/form/FormContext";

export interface ICreateMessageOptions {
    name?: string;
    message?: string;
}

const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

export const createMessage = (options: ICreateMessageOptions, defaultCreator: (field: string) => string) => options.message || capitalizeFirst(defaultCreator(options.name || "field"));

const createField = <T, TContext extends IFormContext = any>(options: ICreateMessageOptions = {}) => ({
    isRequired: [
        (value) => !!value, createMessage(options, (field: string) => `${field} is required!`),
    ] as IUseValidationRule<T, TContext>,

    isEqualOrGreaterThan: (number: T | ((context: TContext) => T), description?: string): IUseValidationRule<T, TContext> => {
        const isSelector = typeof number === "function";
        const selector = (<Function>(isSelector ? number : () => number));
        return [
            ((value, context) => value! >= selector(context)),
            createMessage(options, (field: string) => `${field} should be equal or greater than ${isSelector ? description : number}!`),
        ];
    },

    isDifferentThan: (otherValue: T | ((context: TContext) => T), description?: string): IUseValidationRule<T, TContext> => {
        const isSelector = typeof otherValue === "function";
        const selector = (<Function>(isSelector ? otherValue : () => otherValue));
        return [
            ((value, context) => value !== selector(context)),
            createMessage(options, (field: string) => `${field} should be different than ${isSelector ? description : otherValue}`),
        ];
    },

    shouldMatch: (pattern: string | RegExp): IUseValidationRule<T> => [
        (value) => typeof value !== "undefined" && new RegExp(pattern).test(String(value)),
        createMessage(options, (field) => `${field} should match pattern ${pattern}`),
    ],

    hasLengthBetween: (min: number, max: number): IUseValidationRule<string> => [
        (value) => typeof value !== "undefined" && (value.length > min && value.length <= max),
        createMessage(options, (field) => `${field} should be between ${min} and ${max} characters`),
    ],
});

export const genericField = createField<string>();

export default createField;
