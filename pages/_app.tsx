import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";

// if (
//   typeof window !== "undefined" &&
//   process.env.NODE_ENV === "development"
//   // && /VIVID_ENABLED=true/.test(document.cookie)
// ) {
//   import("vivid-studio").then((v) => v.run());
//   import("vivid-studio/style.css");
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
