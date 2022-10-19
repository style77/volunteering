import React, { ReactNode } from "react"
import { Navbar } from "./navbar"
import Head from "next/head"

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
			{children}
		</>
	)
}
