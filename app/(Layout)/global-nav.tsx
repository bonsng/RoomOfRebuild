"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Item, menus } from "./menu";
import { Squeeze as Hamburger } from "hamburger-react";

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="fixed top-0 z-10 w-full border-b border-gray-800 bg-rice-cake">
      <div className="flex justify-between items-center text-xl px-3 py-2 ">
        <div className="hidden lg:block text-sm">
          <span className="mr-2 text-gray-400 cursor-not-allowed select-none">
            About
          </span>
          <span className="mr-2 text-gray-400 cursor-not-allowed select-none">
            Contact
          </span>
        </div>
        <div>
          <Link href="/" onClick={close}>
            RoomOf
          </Link>
        </div>
        <div className="hidden lg:block text-sm">
          <span className="ml-2 text-gray-400 cursor-not-allowed select-none">
            Login
          </span>
          <span className="ml-2 text-gray-400 cursor-not-allowed select-none">
            Register
          </span>
        </div>
        <div className="lg:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={15} />
        </div>
      </div>

      <div
        className={clsx("overflow-y-auto lg:hidden", {
          "fixed inset-x-0 bottom-0 top-[3rem] mt-px bg-white": isOpen,
          hidden: !isOpen,
        })}
      >
        {menus.map((item) => (
          <GlobalNavItem item={item} close={close} key={item.slug} />
        ))}
      </div>
    </header>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  return (
    <>
      <div className="relative group">
        {!item.disabled ? (
          <span
            title="not in service"
            className="block mx-3 my-3 px-2 py-2 text-gray-400 cursor-not-allowed select-none"
          >
            {item.name}
          </span>
        ) : (
          <>
            <Link
              className="block mx-3 my-3 px-2 py-2  text-gray-500  hover:text-black transition-all duration-500"
              onClick={close}
              href={`/${item.slug}`}
            >
              {item.name}
            </Link>
            <span className="absolute bottom-0 bg-black h-[2px] w-0 left-4 group-hover:w-[90%] transition-all duration-500"></span>
          </>
        )}
      </div>
    </>
  );
}
