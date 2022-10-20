/* eslint-disable react/react-in-jsx-scope */
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/placeholder.png" />
        <link rel="preload" as="image" href="/images/blank.png" />
      </Head>
      <body className="bg-background-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
