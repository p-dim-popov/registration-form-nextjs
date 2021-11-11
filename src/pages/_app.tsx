/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from "react";
import { AppProps } from "next/app";

import "@src/styles/tailwind.css";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactElement
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(<Component {...pageProps} />);
};

export default App;
