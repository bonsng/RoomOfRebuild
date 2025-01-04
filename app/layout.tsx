import type { Metadata } from "next";
import "./globals.css";
import "./globalicon.css";

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
      <body className="overflow-y-auto ">{children}</body>
    </html>
  );
}
