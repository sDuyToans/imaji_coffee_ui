import { Link } from "@heroui/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Navbar as HeroUINavBar,
} from "@heroui/navbar";
import { ReactElement } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { siteConfig } from "@/config/site.ts";
import { ThemeSwitch } from "@/components/theme-switch.tsx";
import Logo from "@/components/ui/logo.tsx";
import { navItem } from "@/types";
import { Icon } from "@/components/layouts/icons.tsx";
import { selectCartCount } from "@/features/cart/cartSlice.ts";
import DrawerUI from "@/components/layouts/drawer.tsx";
import Cart from "@/pages/cart/cart.tsx";
import { useCart } from "@/context/cart.tsx";

export function Navbar(): ReactElement {
  const cartCount = useSelector(selectCartCount) ?? 0;
  const { isOpenCart, setIsOpenCart } = useCart();

  function getUsernameFromToken(): string | null {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return payload.username || payload.sub || null;
    } catch (e) {
      return null;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const username = getUsernameFromToken();
  const isLoggedIn = !!username;

  return (
    <HeroUINavBar
      className="sm:py-[20px] sm:px-[20px] lg:py-[32px] lg:px-[100px] dark:bg-[#FCF7EF]"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="sm:basis-full" justify={"start"}>
        {/* Brand */}
        <NavbarBrand className={"gap-3 max-w-fit"}>
          <Link color="foreground" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-2 items-center">
          {siteConfig.navItems.map(
            (item: navItem): ReactElement => (
              <NavbarItem key={item.label}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active dark:text-black" : "dark:text-black"
                  }
                  color="foreground"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              </NavbarItem>
            ),
          )}
          <NavbarItem>
            <button onClick={() => setIsOpenCart((isOpenCart) => !isOpenCart)}>
              <div className="flex justify-center items-center text-base dark:bg-[#FCF7EF] dark:border-black dark:border dark:hover:text-secondary dark:text-black bg-primary   text-white py-3 px-4 hover:cursor-pointer w-[85px] h-[45px] transition">
                <span>Order</span>
                {cartCount !== 0 && <span> ({cartCount})</span>}
              </div>
            </button>
          </NavbarItem>
          {isLoggedIn ? (
            <>
              <NavbarItem>
                <span className={"text-black px-4"}>Hi, {username}</span>
              </NavbarItem>
              <NavbarItem>
                <button onClick={logout}>Logout</button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Link href="/sign-in">
                <button className="flex items-center justify-center text-base dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary  hover:cursor-pointer w-[85px] h-[45px] text-center">
                  <span>Sign In</span>
                </button>
              </Link>
            </NavbarItem>
          )}

          <ThemeSwitch />
        </div>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <div className={"flex gap-3 items-center"}>
          <DrawerUI
            isOpen={isOpenCart}
            title={"Cart"}
            onClose={() => setIsOpenCart(false)}
          >
            <Cart onClose={() => setIsOpenCart(false)} />
          </DrawerUI>
          <button
            className={"relative"}
            onClick={() => setIsOpenCart((isOpenCart) => !isOpenCart)}
          >
            <Icon className={"cursor-pointer"} name={"shopping-basket"} />
            <div
              className={
                "w-6 h-6 bg-yellow rounded-full text-center absolute -top-3 -right-3 text-black"
              }
            >
              <span className={"text-xs"}>{cartCount}</span>
            </div>
          </button>
          <NavbarMenuToggle
            className={"text-black cursor-pointer"}
            icon={<HiOutlineMenuAlt3 />}
          />
          <ThemeSwitch />
        </div>
      </NavbarContent>

      <NavbarMenu
        className={
          "bg-[#FCF7EF] w-full flex flex-col gap-8 pt-[120px] md:pt-[180px]"
        }
      >
        <div className="mx-4 mt-2 flex flex-col gap-8">
          {siteConfig.navItems.map(
            (item: navItem): ReactElement => (
              <NavbarMenuItem
                key={item.label}
                className={"flex items-center justify-center"}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active text-2xl text-black"
                      : "text-2xl text-black"
                  }
                  color="foreground"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              </NavbarMenuItem>
            ),
          )}
        </div>
        <div className={"flex flex-col justify-center items-center gap-8"}>
          {isLoggedIn ? (
            <>
              <NavbarItem>
                <span className={"text-black px-4"}>Hi, {username}</span>
              </NavbarItem>
              <NavbarItem>
                <button onClick={logout}>Logout</button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Link href="/sign-in">
                <button className="flex items-center justify-center text-base dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary  hover:cursor-pointer w-[85px] h-[45px] text-center">
                  <span>Sign In</span>
                </button>
              </Link>
            </NavbarItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavBar>
  );
}
