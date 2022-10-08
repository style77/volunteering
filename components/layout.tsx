import React, { FC, ReactNode } from "react";
import { Navbar } from "./navbar";
import Head from "next/head";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Layout = ({children, title = "Volunteering"}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
