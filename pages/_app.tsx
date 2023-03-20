import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../utils/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
