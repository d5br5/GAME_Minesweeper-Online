import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	console.log(router);
	return router.pathname === "/" ? (
		<Component {...pageProps} />
	) : (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
