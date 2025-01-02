import type { Metadata } from "next";
import "./globals.css";
import "./globalicon.css";
import GlobalNav from "@/app/global-nav";
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
        <div className="pt-[2.5rem] z-0">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
