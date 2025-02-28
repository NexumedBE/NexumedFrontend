"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch({ type: "LOGOUT" });
        router.push("/");
      } else {
        console.error("Failed to logout.");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
    setNavbarOpen(false)
  };

  // Filter menu items for non-authenticated users
  const filteredMenuData = state.isAuthenticated
    ? menuData
    : menuData.filter(
        (menuItem) =>
          !["Profile", "Subscription", "Configuration", "Third"].includes(menuItem.title)
      );

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            {/* Logo */}
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link href="/" className={`block w-full ${sticky ? "py-5" : "py-8"}`}>
                <Image src="/images/logo/nexumed.png" alt="logo" width={80} height={50} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setNavbarOpen(!navbarOpen)}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? " top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? " top-[-8px] -rotate-45" : ""
                }`}
              />
            </button>

            {/* NAVIGATION (Desktop & Mobile) */}
            <nav
              className={`absolute right-0 top-3/4 z-50 w-[250px] p-6 shadow-lg rounded-md transition-all duration-300 ease-in-out ${
                navbarOpen ? "dark:bg-dark bg-white opacity-100 visible" : "opacity-0 invisible"
              } lg:relative lg:top-0 lg:w-auto lg:bg-transparent lg:shadow-none lg:opacity-100 lg:visible`}
            >
              <ul className="block lg:flex lg:space-x-6">
                {/* Render Menu Items */}
                {filteredMenuData.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    <Link
                      href={menuItem.path}
                      onClick={() => setNavbarOpen(false)}
                      className={`block py-2 px-4 lg:py-4 ${
                        pathname === menuItem.path
                          ? "text-primary"
                          : "text-dark hover:text-[#00bcd4] dark:text-white/70 dark:hover:text-[#00bcd4]"
                      }`} 
                    >
                      {menuItem.title}
                    </Link>
                  </li>
                ))}

                {/* AUTHENTICATION BUTTONS (VISIBLE ON BOTH DESKTOP & MOBILE) */}
                {state.isAuthenticated ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-base text-left text-dark hover:text-primary dark:text-white lg:py-4 lg:w-auto"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/signin"
                        onClick={() => setNavbarOpen(false)}
                        className="block w-full px-4 py-2 text-base text-left text-dark hover:text-primary dark:text-white lg:py-4 lg:w-auto"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        onClick={() => setNavbarOpen(false)}
                        className="block w-full px-4 py-2 text-base text-left text-dark hover:text-primary dark:text-white lg:py-4 lg:w-auto"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* THEME TOGGLER */}
            <div className="hidden lg:block ml-6">
              <ThemeToggler />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
