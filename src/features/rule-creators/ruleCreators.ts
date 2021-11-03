import { IUseValidationRule } from "@src/hooks/useValidation";

export interface ICreateMessageOptions {
    name?: string;
    message?: string;
}

const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

export const createMessage = (options: ICreateMessageOptions, defaultCreator: (field: string) => string) => options.message || capitalizeFirst(defaultCreator(options.name || "field"));

const createField = <T>(options: ICreateMessageOptions = {}) => ({
    isRequired: [
        (value: T) => !!value, createMessage(options, (field: string) => `${field} is required!`),
    ] as IUseValidationRule,
    isEqualOrGreaterThan: (number: number): IUseValidationRule => [
        ((value: T) => +value >= number), createMessage(options, (field: string) => `${field} should be equal or greater than ${number}!`),
    ],
});

export const genericField = createField<string>();

export default createField;
