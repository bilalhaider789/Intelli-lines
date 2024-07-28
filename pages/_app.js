import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { AuthcontextProvider } from "../components/contexts/authcontext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
       <title>Intelli Lines </title>
     </Head>
    <AuthcontextProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthcontextProvider>
     </>
  );
}

export default MyApp;
