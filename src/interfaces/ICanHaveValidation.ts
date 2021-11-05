import { IUseValidationOptions } from "@src/hooks/useValidation/useValidation";
import { IFormContext } from "@src/contexts/form/FormContext";

export interface ICanHaveValidation<T, TContext extends IFormContext<T> = IFormContext<T>> {
    validation?: IUseValidationOptions<T, TContext>;
    showValidationStatus?: boolean;
}
