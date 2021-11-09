import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";
import { IFormContext } from "@src/contexts/form/FormContext";

export interface ICreateMessageOptions {
    name?: string;
    message?: string;
}

const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

export const createMessage = (options: ICreateMessageOptions, defaultCreator: (field: string) => string) => options.message || capitalizeFirst(defaultCreator(options.name || "field"));

type ICreateRuleOptionsWithValue<T> = T;

type ICreateRuleOptionsWithContextSelector<T, TContext> = {
    selector: (context: TContext) => T,
    description: string,
};

type ICreateRuleOptions<T, TContext> = (
  ICreateRuleOptionsWithValue<T> | ICreateRuleOptionsWithContextSelector<T, TContext>
);

const getSelectorWithDescription = <T, TContext, TOptions extends ICreateRuleOptions<T, TContext>>(
    value: TOptions,
): [(context?: TContext) => T, string] => {
    const isSelector = typeof value === "object";
    const data: { selector: (context?: TContext) => T, description: string } = {
        selector: () => value as T,
        description: String(value),
    };

    if (isSelector) {
        const val = value as ICreateRuleOptionsWithContextSelector<T, TContext>;
        data.selector = (<(context?: TContext) => T>val.selector);
        data.description = val.description;
    }

    return [data.selector, data.description];
};

const createRule = <T, TContext extends IFormContext<T>, TOptions extends ICreateRuleOptions<T, TContext>>(options: ICreateMessageOptions = {}) => ({
    isRequired: [
        (value) => !!value, createMessage(options, (field: string) => `${field} is required!`),
    ] as IUseValidationRule<T>,

    isEqualOrGreaterThan: (
        number: TOptions,
    ): IUseValidationRule<T, TContext> => {
        const [selector, description] = getSelectorWithDescription<T, TContext, TOptions>(number);
        return [
            ((value, context) => Number(value) >= Number(selector(context))),
            createMessage(options, (field: string) => `${field} should be equal or greater than ${description}!`),
        ];
    },

    isDifferentThan: (otherValue: TOptions): IUseValidationRule<T, TContext> => {
        const [selector, description] = getSelectorWithDescription<T, TContext, TOptions>(otherValue);
        return [
            ((value, context) => {
                const contextValue = selector(context);
                return value !== contextValue;
            }),
            createMessage(options, (field: string) => `${field} should be different than ${description}`),
        ];
    },

    shouldNotInclude: (otherValue: TOptions): IUseValidationRule<T, TContext> => {
        const [selector, description] = getSelectorWithDescription(otherValue);
        return [
            (value, context) => {
                const contextValue = selector(context);
                return String(value).includes(String(contextValue));
            },
            createMessage(options, (field) => `${field} should not contain ${description}`),
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

    hasMaxLength: (max: number): IUseValidationRule<string> => [
        ((value) => typeof value !== "undefined" && value.length <= max),
        createMessage(options, (field) => `${field} should be less than ${max} characters`),
    ],
});

const Rule = <T, TContext extends IFormContext<T> = IFormContext<T>> (options: ICreateMessageOptions = {}) => ({
    ...createRule<T, TContext, ICreateRuleOptionsWithValue<T>>(options),
    withContext: createRule<
    T, TContext, ICreateRuleOptionsWithContextSelector<T, TContext>
    >(options),
});

export default Rule;
