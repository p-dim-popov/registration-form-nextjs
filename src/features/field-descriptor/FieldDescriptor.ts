import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";
import { IFormContext } from "@src/contexts/form/FormContext";
import { isBefore, parse } from "date-fns";

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

export interface IFieldRule<T, TContext extends IFormContext<T> = IFormContext<T>> {
    (message?: string): IUseValidationRule<T, TContext>;
}

export const isRequired: IFieldRule<any> = (message?: string): IUseValidationRule<any> => ({
    test: (value) => typeof value !== "undefined",
    message: message ?? "Field is required",
});

export const isEqualOrGreaterThan = <T, TContext extends IFormContext<T> = IFormContext<T>> (number: ICreateRuleOptions<T, TContext>): IFieldRule<T, TContext> => (message?: string) => {
    const [selector, description] = getSelectorWithDescription(number);
    return {
        test: (value, context) => Number(value) >= Number(selector(context)),
        message: message ?? `Field should be equal or greater than ${description}`,
    };
};

export const isDifferentThan = <T, TContext extends IFormContext<T> = IFormContext<T>> (otherValue: ICreateRuleOptions<T, TContext>): IFieldRule<T, TContext> => (message?: string) => {
    const [selector, description] = getSelectorWithDescription(otherValue);
    return {
        test: ((value, context) => {
            const contextValue = selector(context);
            return value !== contextValue;
        }),
        message: message ?? `Field should be different than ${description}`,
    };
};

export const shouldNotInclude = <T, TContext extends IFormContext<T>> (otherValue: ICreateRuleOptions<T, TContext>): IFieldRule<T, TContext> => (message?: string) => {
    const [selector, description] = getSelectorWithDescription(otherValue);
    return {
        test: (value, context) => {
            const contextValue = selector(context);
            return String(value).includes(String(contextValue));
        },
        message: message ?? `Field should not contain ${description}`,
    };
};

export const shouldMatch = <T, TContext extends IFormContext<T>> (pattern: string | RegExp): IFieldRule<T, TContext> => (message?: string) => ({
    test: (value) => typeof value !== "undefined" && new RegExp(pattern).test(String(value)),
    message: message ?? `Field should match pattern ${pattern}`,
});

export const hasLengthBetween = (min: number, max: number): IFieldRule<string> => (message?: string) => ({
    test: (value) => typeof value !== "undefined" && (value.length > min && value.length <= max),
    message: message ?? `Field should be between ${min} and ${max} characters`,
});

export const hasMaxLength = (max: number): IFieldRule<string> => (message?: string) => ({
    test: ((value) => typeof value !== "undefined" && value.length <= max),
    message: message ?? `Field should be less than ${max} characters`,
});

export const isValidBirthDate = (format: string = "d-M-yyyy"): IFieldRule<string> => (message?: string) => ({
    test: (value) => {
        const parsedDate = parse(String(value), format, new Date());
        return isBefore(parsedDate, new Date());
    },
    message: message ?? "Field is not valid",
});

export interface IFieldDefinitionOptions<T, TContext extends IFormContext<T>> {
    name?: string;
    rules: Array<[rule: IFieldRule<T, TContext>, message?: string]>;
}

export const capitalizeFirst = (value: string) => `${value[0].toLocaleUpperCase()}${value.substr(1)}`;

const describeField = <T, TContext extends IFormContext<T> = IFormContext<T>> ({
    name = "field", rules,
}: IFieldDefinitionOptions<T, TContext>): IUseValidationRule<T, TContext>[] => rules.map(([r, message]) => r(message || capitalizeFirst(r().message.replace(/field/gmi, name))));

export default describeField;
