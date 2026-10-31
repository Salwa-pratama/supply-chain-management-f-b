import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "BAPER (Bantu Pesan dan Rekap)",
  description: "Platform supply chain management untuk bisnis F&B",
};

import QueryProvider from "@/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="bg-[#F5F8F6] text-on-surface font-body-md text-body-md antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
