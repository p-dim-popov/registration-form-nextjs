import { IUseValidationRule } from "@src/hooks/useValidation";

export interface ICreateMessageOptions {
    name?: string;
    message?: string;
}

const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

export const createMessage = (options: ICreateMessageOptions, defaultCreator: (field: string) => string) => options.message || capitalizeFirst(defaultCreator(options.name || "field"));

const createField = <T, TContext = null>(options: ICreateMessageOptions = {}) => ({
    isRequired: [
        (value: T) => !!value, createMessage(options, (field: string) => `${field} is required!`),
    ] as IUseValidationRule,
    isEqualOrGreaterThan: (number: T | ((context: TContext) => T), description?: string) => {
        const isSelector = typeof number === "function";
        const selector = (<Function>(isSelector ? number : () => number));
        return [
            ((value: T, context: TContext) => value >= selector(context)),
            createMessage(options, (field: string) => `${field} should be equal or greater than ${isSelector ? description : number}!`),
        ] as IUseValidationRule<TContext>;
    },
    isDifferentThan: (otherValue: T | ((context: TContext) => T), description?: string) => {
        const isSelector = typeof otherValue === "function";
        const selector = (<Function>(isSelector ? otherValue : () => otherValue));
        return [
            ((value: T, context: TContext) => value !== selector(context)),
            createMessage(options, (field: string) => `${field} should be different than ${isSelector ? description : otherValue}`),
        ] as IUseValidationRule<TContext>;
    },
});

export const genericField = createField<string>();

export default createField;
