// In `pages/_document.js`
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
				<Script
					src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
					strategy="beforeInteractive"
				/>
			</body>
		</Html>
	);
}
