import React, { useContext } from "react";
import RegisterContext, { getNextRegisterPage } from "@src/contexts/register/RegisterContext";
import { useRouter } from "next/router";

const RegisterFormFooter: React.FC = () => {
    const context = useContext(RegisterContext);
    const router = useRouter();

    return (
        <div className="flex flex-col items-center">
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-44 rounded-full"
                onClick={() => {
                    const nextPage = getNextRegisterPage(context.page);
                    if (nextPage) {
                        router.push(nextPage);
                    } else {
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
                    }
                }}
            >
                Continue
            </button>
            <div className="border-t-2 border-gray-200 min-w-full self-baseline my-8" />
            <div>
                Need help?
                {" "}
                <a target="_blank" href="/contact-us">Contact us</a>
            </div>
        </div>
    );
};

export default RegisterFormFooter;
