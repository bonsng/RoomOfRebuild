import { Metadata } from "next";
import React from "react";
import RoomNav from "./room-nav";

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
      <RoomNav />
      {children}
    </>
  );
}
