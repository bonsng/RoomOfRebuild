import React from "react";

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
