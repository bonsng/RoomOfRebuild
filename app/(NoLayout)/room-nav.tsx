"use client";

import Link from "next/link";
import "./room-nav.css";

export default function RoomNav() {
  return (
    <header className="absolute top-6 left-10 z-10 flex justify-center">
      <Link href="/">
        <ul>
          <li>
            <span className="material-symbols-outlined icon">home</span>
            <span className="title">RoomOf</span>
          </li>
        </ul>
      </Link>
    </header>
  );
}
