import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "@/modules/providers";
import { Toaster } from "sonner";

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
      <body className="bg-[#f5f5f5] font-uncut">
        <Providers>
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
