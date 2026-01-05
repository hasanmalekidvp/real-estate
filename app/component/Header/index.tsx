/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Context } from "@/context/MainContext";
import { getUserInfo } from "@/app/services/user";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { isLoggedIn, handleLogout } = React.useContext(Context);
  const [user, setUser] = useState<any>(null);

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
  ];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUserInfo();
        setUser(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setUser(null);
        }
      }
    };

    loadUser();
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navLinks.map((item) => (
                      <DisclosureButton
                        key={item.href}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.title
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.title ? "page" : undefined}
                      >
                        {item.title}
                      </DisclosureButton>
                    ))}
                  </div>
                </div>
              </div>

              {isLoggedIn && user ? (
                <div className="absolute right-0 flex items-center pr-2 space-x-3">
                  <Link
                    href={"/users/posts/add"}
                    type="button"
                    className="relative mr-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Add new Post</span>
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>

                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://media.licdn.com/dms/image/v2/D4E03AQESuSv4RccQ_w/profile-displayphoto-scale_400_400/B4EZs3xnB.GcAg-/0/1766167312343?e=2147483647&v=beta&t=GnTvCGq4gpymx3PnonXB_ZypKZV53XXro5BmmP0Gbmc"
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Your Profile
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Settings
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Sign out
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <a
                  href={"/auth/login"}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign in
                </a>
              )}
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((item) => (
                <DisclosureButton
                  key={item.href}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.title
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.title ? "page" : undefined}
                >
                  {item.title}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
