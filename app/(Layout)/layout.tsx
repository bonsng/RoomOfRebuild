import type { Metadata } from "next";
import GlobalNav from "./global-nav";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "RoomOf",
  description: "Room of whom you miss.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalNav />
      <main className="pt-[2.5rem] z-0">{children}</main>
      <Footer />
    </>
  );
}
