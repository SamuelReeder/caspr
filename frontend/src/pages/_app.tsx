/**
 * This file is used to wrap the entire application with the Providers component.
 * This is where the global styles are imported.
 * @param {AppProps} param0 - The props for the App component
 * @returns The wrapped application
 */
import { AppProps } from "next/app";
import { Providers } from "../app/providers";
import "../app/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</Providers>
	);
}

export default MyApp;
