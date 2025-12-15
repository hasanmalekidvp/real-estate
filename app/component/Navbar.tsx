"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      title: "Home",
    },

    {
      href: "/property",
      title: "Property",
    },

    {
      href: "/add-property",
      title: "Add Property",
    },

    {
      href: "/login",
      title: "Login",
    },
  ];

  return (
    <nav className="shadow p-4">
      <Container>
        <div className="flex justify-between flex-row">
          <div>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className={`mr-4 ${
                  pathname === item.href ? "text-sky-500" : ""
                }`}
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex justify-between flex-row">
            <Link href="/wishlist">Wishlist</Link>
            <span className="px-2 py-1 bg-yellow-500 text-white rounded-full"></span>

            <button className="text-red-600 ml-4">Logout</button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
