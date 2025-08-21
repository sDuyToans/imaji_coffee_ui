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

import { siteConfig } from "@/config/site.ts";
import { ThemeSwitch } from "@/components/theme-switch.tsx";
import Logo from "@/components/ui/logo.tsx";
import { navItem } from "@/types";
import { Icon } from "@/components/layouts/icons.tsx";

export function Navbar(): ReactElement {
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
            <Link href="/order">
              <button className="flex justify-center items-center text-base dark:bg-[#FCF7EF] dark:border-black dark:border dark:hover:text-secondary dark:text-black bg-primary   text-white py-3 px-4 hover:cursor-pointer w-[85px] h-[45px] transition">
                <span>Order</span>
              </button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/sign-in">
              <button className="flex items-center justify-center text-base dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary  hover:cursor-pointer w-[85px] h-[45px] text-center">
                <span>Sign In</span>
              </button>
            </Link>
          </NavbarItem>
          <ThemeSwitch />
        </div>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <div className={"flex gap-3 items-center"}>
          <Icon className={"cursor-pointer"} name={"shopping-basket"} />
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
          <NavbarItem className={"w-full"}>
            <Link className={"w-full"} href="/order">
              <button className="p-4 text-2xl w-full md:w-2/5 mx-auto flex justify-center items-center dark:bg-[#FCF7EF] dark:border-black dark:border dark:hover:text-secondary dark:text-black bg-primary   text-white py-3 px-4 hover:cursor-pointer  transition">
                <span>Order</span>
              </button>
            </Link>
          </NavbarItem>
          <NavbarItem className={"w-full"}>
            <Link className={"w-full"} href="/sign-in">
              <button className="p-4 text-2xl w-full md:w-2/5 mx-auto flex items-center justify-center dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary  hover:cursor-pointer text-center">
                <span>Sign In</span>
              </button>
            </Link>
          </NavbarItem>
        </div>
      </NavbarMenu>
    </HeroUINavBar>
  );
}
