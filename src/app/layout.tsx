import "./globals.css";
import type { Metadata, ResolvingMetadata } from "next";
import clsx from "clsx";
import { Nunito, Nunito_Sans } from "next/font/google";
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Poole Town Fallback Title",
    description:
      settings.data.meta_description || "Poole Town Fallback Description",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        <Header />
        {children}
        <Footer />
        <div className="fixed bg-gradient-to-tr from-emerald-50 to-cyan-50 z-[-1] inset-0 opacity-50"></div>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
