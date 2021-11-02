import { IUseValidationRule } from "@src/hooks/useValidation";

export interface ICreateMessageOptions {
  name?: string;
  message?: string;
}

const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

export const createMessage = (options: ICreateMessageOptions, defaultCreator: (field: string) => string) => options.message || capitalizeFirst(defaultCreator(options.name || "field"));

export const isRequired = <T> (options: ICreateMessageOptions = {}): IUseValidationRule<T> => [
  (value: T) => !!value, createMessage(options, (field: string) => `${field} is required!`),
];

export const isEqualOrGraterThan = (number: number) => (options: ICreateMessageOptions = {}): IUseValidationRule<number> => [
  ((value: number) => value >= number), createMessage(options, (field: string) => `${field} should be equal or grater than ${number}`),
];
