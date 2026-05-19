import type { Metadata } from "next";
import Script from "next/script";
import { Syne, DM_Sans, Source_Code_Pro } from "next/font/google";
import "@/styles/globals.scss";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "accessible-ariel",
  description: "accessible-ariel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${sourceCodePro.variable}`}>
      <body>
        {children}
        <Script src="/scripts/jquery.min.js" strategy="beforeInteractive" />

        <Script src="/scripts/plugins/instafeed/instafeed.min.js" strategy="afterInteractive" />
        <Script
          src="/scripts/plugins/jquery-validate/jquery.validate.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/scripts/plugins/magnific-popup/jquery.magnific-popup.min.js"
          strategy="afterInteractive"
        />
        <Script src="/scripts/plugins/one-page-nav/jquery.nav.js" strategy="afterInteractive" />
        <Script
          src="/scripts/plugins/owl-carousel/owl.carousel.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/scripts/plugins/shuffle/jquery.shuffle.modernizr.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/scripts/plugins/twitter-fetcher/twitterFetcher_min.js"
          strategy="afterInteractive"
        />
        <Script src="/scripts/plugins/wowjs/wow.min.js" strategy="afterInteractive" />
        <Script src="https://kit.fontawesome.com/a7974b8dae.js" strategy="afterInteractive" />

        <Script src="/scripts/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
