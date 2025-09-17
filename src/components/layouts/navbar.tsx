import { ReactElement } from "react";
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
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { siteConfig } from "@/config/site.ts";
import { ThemeSwitch } from "@/components/theme-switch.tsx";
import Logo from "@/components/ui/logo.tsx";
import { navItem } from "@/types";
import { Icon } from "@/components/layouts/icons.tsx";
import DrawerUI from "@/components/layouts/drawer.tsx";
import Cart from "@/pages/cart/cart.tsx";
import { useCart } from "@/context/cart.tsx";
import { logout } from "@/features/auth/authSlice.ts";
import { useGetCartQuery } from "@/api/cart/cartApi.ts";

interface TokenPayload {
  username?: string;
  sub?: string;
}

function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = jwtDecode<TokenPayload>(token);

    return payload.username || payload.sub || null;
  } catch {
    return null;
  }
}

function AuthButtons({
  isLoggedIn,
  username,
  onLogout,
}: {
  isLoggedIn: boolean;
  username: string | null;
  onLogout: () => void;
}) {
  return isLoggedIn ? (
    <>
      <NavbarItem>
        <span className="text-black px-4">
          <Link href={"/account"}>Hi, {username}</Link>
        </span>
      </NavbarItem>
      <NavbarItem>
        <button
          className="flex items-center justify-center text-base dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary hover:cursor-pointer w-[85px] h-[45px] text-center"
          onClick={onLogout}
        >
          Logout
        </button>
      </NavbarItem>
    </>
  ) : (
    <NavbarItem>
      <Link href="/sign-in">
        <button className="flex items-center justify-center text-base dark:bg-primary dark:text-black dark:hover:text-white transition text-primary px-4 py-3 border border-primary hover:cursor-pointer w-[85px] h-[45px] text-center">
          <span>Sign In</span>
        </button>
      </Link>
    </NavbarItem>
  );
}

export function Navbar(): ReactElement {
  const { data: cart } = useGetCartQuery();

  let cartCount: number =
    cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const { isOpenCart, setIsOpenCart } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = getUsernameFromToken();
  const isLoggedIn = !!username;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <HeroUINavBar
      className="sm:py-[20px] sm:px-[20px] lg:py-[32px] lg:px-[100px] dark:bg-[#FCF7EF]"
      maxWidth="xl"
      position="sticky"
    >
      {/* Left Side Logo */}
      <NavbarContent className="sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link color="foreground" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <div className="hidden lg:flex gap-2 items-center">
          {siteConfig.navItems.map((item: navItem) => (
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
          ))}

          {/* Order Button */}
          <NavbarItem>
            <button onClick={() => setIsOpenCart(!isOpenCart)}>
              <div className="flex justify-center items-center text-base dark:bg-[#FCF7EF] dark:border-black dark:border dark:hover:text-secondary dark:text-black bg-primary text-white py-3 px-4 hover:cursor-pointer w-[85px] h-[45px] transition">
                <span>Order</span>
                {cartCount > 0 && <span> ({cartCount})</span>}
              </div>
            </button>
          </NavbarItem>

          {/* Auth Buttons */}
          <AuthButtons
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />

          <ThemeSwitch />
        </div>
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <div className="flex gap-3 items-center">
          <DrawerUI
            isOpen={isOpenCart}
            title="Cart"
            onClose={() => setIsOpenCart(false)}
          >
            <Cart onClose={() => setIsOpenCart(false)} />
          </DrawerUI>

          <button
            className="relative"
            onClick={() => setIsOpenCart(!isOpenCart)}
          >
            <Icon className="cursor-pointer" name="shopping-basket" />
            {cartCount > 0 && (
              <div className="w-6 h-6 bg-yellow rounded-full text-center absolute -top-3 -right-3 text-black">
                <span className="text-xs">{cartCount}</span>
              </div>
            )}
          </button>

          <NavbarMenuToggle
            className="text-black cursor-pointer"
            icon={<HiOutlineMenuAlt3 />}
          />
          <ThemeSwitch />
        </div>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu className="bg-[#FCF7EF] w-full flex flex-col gap-8 pt-[120px] md:pt-[180px]">
        <div className="mx-4 mt-2 flex flex-col gap-8">
          {siteConfig.navItems.map((item: navItem) => (
            <NavbarMenuItem
              key={item.label}
              className="flex items-center justify-center"
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
          ))}
        </div>

        {/* Auth Buttons Mobile */}
        <div className="flex flex-col justify-center items-center gap-8">
          <AuthButtons
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />
        </div>
      </NavbarMenu>
    </HeroUINavBar>
  );
}
