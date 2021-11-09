import React from "react";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";
import { ICanHaveOverriddenClassName } from "@src/interfaces/ICanHaveOverriddenClassName";
import classNames from "classnames";
import { ICanMergeClassNames } from "@src/interfaces/ICanMergeClassNames";

export interface ILabelProps extends ICanBeHidden, ICanHaveOverriddenClassName, ICanMergeClassNames {
    htmlFor: string;
    label: string;
}

const Label: React.FC<ILabelProps> = ({
    isHidden, htmlFor, label, className, shouldMergeClassNames,
}) => (
    !isHidden ? (
        <label
            htmlFor={htmlFor}
            className={classNames({
                "font-semibold": !className || shouldMergeClassNames,
                [className ?? ""]: !!className,
            })}
        >
            {label}
        </label>
    ) : null
);

export default Label;
