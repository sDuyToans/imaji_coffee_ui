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

import { siteConfig } from "@/config/site.ts";
import { ThemeSwitch } from "@/components/theme-switch.tsx";
import Logo from "@/components/ui/logo.tsx";
import { navItem } from "@/types";

export function Navbar(): ReactElement {
  return (
    <HeroUINavBar
      className="sm:py-[20px] sm:px-[20px] lg:py-[32px] lg:px-[100px] dark:bg-primary"
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
                <Link color="foreground" href={item.href}>
                  <h5 className="text-xl">{item.label}</h5>
                </Link>
              </NavbarItem>
            ),
          )}
          <NavbarItem>
            <Link href="/order">
              <button className="text-base bg-primary dark:bg-white dark:text-primary text-white py-3 px-4 hover:cursor-pointer w-[85px] h-[45px]">
                Order
              </button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/sign-in">
              <button className="text-base text-primary px-4 py-3 border border-primary dark:border-white dark:text-white hover:cursor-pointer w-[85px] h-[45px]">
                Sign In
              </button>
            </Link>
          </NavbarItem>
          <ThemeSwitch />
        </div>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <div className={"flex gap-2 items-center"}>
          <ThemeSwitch />
          <NavbarMenuToggle icon={<HiOutlineMenuAlt3 />} />
        </div>
      </NavbarContent>

      <NavbarMenu className={"bg-[#FCF7EF]"}>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map(
            (item: navItem): ReactElement => (
              <NavbarMenuItem key={item.label}>
                <Link color="foreground" href={item.href}>
                  <p className="text-2xl">{item.label}</p>
                </Link>
              </NavbarMenuItem>
            ),
          )}
        </div>
      </NavbarMenu>
    </HeroUINavBar>
  );
}
