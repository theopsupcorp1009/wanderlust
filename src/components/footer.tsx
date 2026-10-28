import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "My Profile", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socials = [
  { label: "X (Twitter)", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={420}
          height={62}
          className="h-auto"
        />
        <p className="mt-5 text-lg text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-wide uppercase">
              Newsletter
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-5 max-w-[300px]">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter email"
                className="h-11 w-full bg-neutral-800 px-4 pr-12 text-sm text-white outline-none placeholder:text-neutral-400"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Subscribe"
                className="absolute top-1/2 right-1 size-9 -translate-y-1/2 bg-transparent text-white hover:bg-neutral-700"
              >
                <ArrowUpRight />
              </Button>
            </form>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[17px] text-neutral-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-wide uppercase">
              Support
            </h3>
            <ul className="mt-5 space-y-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[17px] text-neutral-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+17869016222"
                  className="text-[17px] text-neutral-200 transition-colors hover:text-white"
                >
                  786 901 6222
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="text-[17px] text-neutral-200 transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <ul className="flex items-center gap-8">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white transition-colors hover:text-cyan-600"
                >
                  <social.icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
