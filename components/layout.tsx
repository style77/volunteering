import React, { FC, ReactNode } from "react";
import { Navbar } from "./navbar";
import Head from "next/head";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Layout = ({children}: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-background-color">
        {children}
      </main>
    </>
  );
};
