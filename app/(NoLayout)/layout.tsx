import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "RoomOf ExampleRoom",
  description: "Example room of RoomOf service.",
};

export default function ExampleRoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className="overflow-y-auto ">{children}</body>
      </html>
    </>
  );
}
