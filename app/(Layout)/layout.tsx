import type { Metadata } from "next";
import "./globals.css";
import "./globalicon.css";
import GlobalNav from "./global-nav";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "RoomOf",
  description: "Room of whom you miss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-y-auto ">
        <GlobalNav />
        <main className="pt-[2.5rem] z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
