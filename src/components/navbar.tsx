"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toastError, toastSuccess } from "@/lib/notifications";
import { signOut, useSession } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "my-bookings" },
];

const signedOutLinks = [
  { label: "Login", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAccountMenuOpen, setMobileAccountMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toastSuccess("Signed out", "See you soon!");
            router.push("/sign-in");
          },
        },
      });
    } catch (err) {
      toastError(
        "Sign out failed",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // Only the link for the current page gets the active design
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const desktopLinkClasses = (href: string) =>
    cn(
      "text-sm font-medium transition-colors hover:text-cyan-700",
      isActive(href) && "text-cyan-700 underline underline-offset-4"
    );

  const mobileLinkClasses = (href: string) =>
    cn(
      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
      isActive(href)
        ? "bg-cyan-50 text-cyan-700"
        : "text-foreground/80 hover:text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="relative mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo — in flow on mobile, centered on desktop */}
        <Link
          href="/"
          className="flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={130}
            height={19}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={desktopLinkClasses(link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-6">
          {!isPending &&
            (session ? (
              <Popover open={accountMenuOpen} onOpenChange={setAccountMenuOpen}>
                <PopoverTrigger
                  type="button"
                  aria-label="Open profile menu"
                  className="hidden cursor-pointer items-center gap-2 rounded-md text-sm font-medium transition-colors hover:text-cyan-700 md:flex"
                >
                  <UserIcon className="size-4" />
                  Profile
                  <Avatar className="size-7">
                    {session.user.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {(session.user.name.charAt(0) || "U").toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-52">
                  <PopoverHeader>
                    <PopoverTitle>{session.user.name}</PopoverTitle>
                    <PopoverDescription>
                      {session.user.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <Link
                    href="/profile"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      handleSignOut();
                    }}
                    className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Sign Out
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden text-sm font-medium transition-colors hover:text-cyan-700 md:block"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden text-sm font-medium transition-colors hover:text-cyan-700 md:block"
                >
                  Sign Up
                </Link>
              </>
            ))}

          {/* Mobile menu toggle — base & sm screens only */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — all links plus user account block (signed in) or Login/Sign Up (signed out) */}
      {menuOpen ? (
        <div className="border-t px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {(session ? navLinks : [...navLinks, ...signedOutLinks]).map(
              (link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={mobileLinkClasses(link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* User image + name + email — opens Profile / Sign Out */}
          {!isPending && session ? (
            <Popover
              open={mobileAccountMenuOpen}
              onOpenChange={setMobileAccountMenuOpen}
            >
              <PopoverTrigger
                type="button"
                className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
              >
                <Avatar className="size-10">
                  {session.user.image ? (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  ) : (
                    <AvatarFallback>
                      {(session.user.name.charAt(0) || "U").toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {session.user.email}
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-52">
                <Link
                  href="/profile"
                  onClick={() => {
                    setMobileAccountMenuOpen(false);
                    setMenuOpen(false);
                  }}
                  className="flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileAccountMenuOpen(false);
                    setMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors hover:bg-muted"
                >
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
