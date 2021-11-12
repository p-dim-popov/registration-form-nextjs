import React, { useContext } from "react";
import Link from "next/link";
import RegisterContext, { getNextRegisterPage } from "@src/contexts/register/RegisterContext";

const ContinueButton: React.FC = () => {
    const context = useContext(RegisterContext);
    const nextRegisterPage = getNextRegisterPage(context.page);

    return (
        <Link href={nextRegisterPage}>
            <a
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-44 rounded-full"
                onClick={() => {
                    if (nextRegisterPage) {
                        return;
                    }

                    const definitions = Object.values(context.definitions)
                        .reduce((acc, cur) => ({
                            ...acc, ...cur,
                        }), {});

                    const errors = Object.entries(definitions)
                        .flatMap(([fieldName, rules]) => rules
                            .map(({ test, message }) => (
                                test(context.data[fieldName], context)
                                    ? null
                                    : message)))
                        .filter((x) => !!x);
                    alert(JSON.stringify({ errors, data: context.data, definitions }, null, 4));
                }}
            >
                Continue
            </a>
        </Link>

    );
};

export default ContinueButton;
