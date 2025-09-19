import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EpiStock</title>
        <meta
          name="description"
          content="EpiStock is a project to track the storage of EPITECH Réunion equipment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div
          className={`flex flex-col min-h-screen bg-slate-200 text-slate-900 ${geistSans.variable} ${geistMono.variable}`}
        >
          <Navbar />
          <main className="flex-1 p-10">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
