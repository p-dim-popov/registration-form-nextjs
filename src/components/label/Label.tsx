import React from "react";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";
import { ICanHaveOverriddenClassName } from "@src/interfaces/ICanHaveOverriddenClassName";
import classNames from "classnames";

export interface ILabelProps extends ICanBeHidden, ICanHaveOverriddenClassName {
    htmlFor: string;
    label: string;
}

const Label: React.FC<ILabelProps> = ({
    isHidden, htmlFor, label, className,
}) => (
    !isHidden ? (
        <label
            htmlFor={htmlFor}
            className={classNames({
                "font-semibold": !className,
                [className]: !!className,
            })}
        >
            {label}
        </label>
    ) : null
);

export default Label;
