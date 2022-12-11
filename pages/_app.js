import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { AuthcontextProvider } from "../components/contexts/authcontext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthcontextProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthcontextProvider>
  );
}

export default MyApp;
