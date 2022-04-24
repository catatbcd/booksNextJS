import Layout from "../components/layout/layout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const route = router.route;
  useEffect(() => {
    getSession().then((session) => {
      if (!session && route !== "/") {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Books-Amigos4All</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
