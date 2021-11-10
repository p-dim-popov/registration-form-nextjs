import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";
import { IFormContext } from "@src/contexts/form/FormContext";
import { capitalizeFirst } from "@src/features/rule-creators/ruleCreators";

export type IFieldRule<
    T, TContext extends IFormContext<T> = IFormContext<T>,
> = (message?: string) => IUseValidationRule<T, TContext>;

const isRequired: IFieldRule<any> = (message?: string): IUseValidationRule<any> => ({
    test: (value) => typeof value !== "undefined",
    message: message ?? "Field is required",
});

const FieldDefinition = <T, TContext extends IFormContext<T> = IFormContext<T>> (
    name: string = "field", rules: [rule: IFieldRule<T, TContext>, message?: string][],
): IUseValidationRule<T, TContext>[] => rules.map(([r, message]) => r(message || capitalizeFirst(r().message.replace(/field/gmi, name))));

export default FieldDefinition;
