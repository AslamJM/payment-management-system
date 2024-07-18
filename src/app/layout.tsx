import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionProviderWrapper from "./_components/SessionProvider";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProviderWrapper>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
