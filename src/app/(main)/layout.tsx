import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionProviderWrapper from "./_components/SessionProvider";
import { Dashboard } from "~/components/layouts/Dashboard";

export const metadata = {
  title: "HS Enterprises",
  description: "HS Enterprises payment management system",
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
          <TRPCReactProvider>
            <Dashboard>{children}</Dashboard>
          </TRPCReactProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
