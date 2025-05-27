"use client";

import Link from "next/link";
import "./room-nav.css";
import { usePathname } from "next/navigation";

export default function RoomNav() {
  const pathname = usePathname();
  return (
    <header className="fixed top-6 left-10 z-10 flex justify-center">
      <RoomNavLink url={pathname === "/example-room" ? "home" : ""} />
    </header>
  );
}

const RoomNavLink = ({ url }: { url: string }) => {
  return (
    <Link href={url === "home" ? "/" : "/example-room"}>
      <ul>
        <li>
          <span className="material-symbols-outlined icon">
            {url === "home" ? "home" : "chevron_left"}
          </span>
          <span className="title">{url === "home" ? "RoomOf" : "Go Back"}</span>
        </li>
      </ul>
    </Link>
  );
};
