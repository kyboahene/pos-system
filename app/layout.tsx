import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "@/modules/providers";

export const metadata: Metadata = {
  title: "Syst",
  description: "A web-based Point of Sale (POS) system using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f0f5f3] font-uncut">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
