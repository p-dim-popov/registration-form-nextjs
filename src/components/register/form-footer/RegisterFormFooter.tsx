import React, { useContext } from "react";
import RegisterContext, { getNextRegisterPage } from "@src/contexts/register/RegisterContext";
import Link from "next/link";

const RegisterFormFooter: React.FC = () => {
    const context = useContext(RegisterContext);
    const nextRegisterPage = getNextRegisterPage(context.page);

    return (
        <section className="flex flex-col items-center mt-20">
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
            <div className="border-t-2 border-gray-200 min-w-full self-baseline my-8" />
            <div>
                Need help?
                {" "}
                <a target="_blank" href="/contact-us">Contact us</a>
            </div>
        </section>
    );
};

export default RegisterFormFooter;
