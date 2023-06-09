import "./globals.css";
import { Oxygen_Mono } from "next/font/google";

import { ToasterProvider, SupabaseProvider, UserProvider } from "@/providers";
import ModalProvider from "@/providers/ModalProvider";
import { Sidebar } from "@/components";

const font = Oxygen_Mono({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Craftex",
  description: "TODO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
