import localFont from "next/font/local";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Menu from "@/components/menu";
import { preload } from "react-dom";
import { Env } from "@/configs/env";

const fontSans = localFont({
  src: "../public/fonts/Peridot_PE_Variable_Regular.otf",
  display: "swap",
  variable: "--font-peridot",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preload(`${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}/babilab.png`, {
    as: "image",
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} font-sans antialiased`}>
        <header className="fixed left-0 right-0 top-4 text-white bg-red-500 z-10 mix-blend-exclusion">
          <h1 className="font-extrabold text-2xl md:text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 font-stretch-extra-expanded tracking-[-0.07em] flex flex-col items-center leading-[0.8em]">
            <span>BABI</span>
            <span>MUSIC</span>
          </h1>
          <div className="fixed right-4 uppercase font-light">
            <Menu />
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
