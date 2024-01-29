import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/ui/nav";
import ToastProvider from "@/components/toast/ToastProvider";

export const metadata: Metadata = {
  title: "Park Me Up",
  description: "Parking management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-300">
        <ToastProvider>
          <Nav />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
