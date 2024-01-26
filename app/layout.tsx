import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/ui/nav";

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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
