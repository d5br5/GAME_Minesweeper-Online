import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import Head from "next/head";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<SWRConfig value={{ fetcher }}>
				<Head>
					<title>Prism:Station</title>
				</Head>
				<Component {...pageProps} />
			</SWRConfig>
		</RecoilRoot>
	);
}

export default MyApp;
