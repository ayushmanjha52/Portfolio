"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "./nav";
import { ModeToggle } from "./ModeToggle";
import { GitHubIcon } from "./BrandIcons";
import { profile } from "@/data/profile";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 whitespace-nowrap font-serif text-[23px] leading-none text-paper"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true" className="relative grid size-5 place-items-center rounded-full border border-signal-line">
            <span className="size-1.5 rounded-full bg-signal" />
          </span>
          Ayushman Jha
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[14.5px] text-mute">
            {navItems.map((item) => (
              <li key={item.href} className={item.engineerOnly ? "eng-only" : undefined}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* On phones the toggle lives in the menu; a wrapper avoids hidden/inline-flex clashing. */}
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden size-9 place-items-center rounded-full border border-line text-mute transition-colors hover:border-line-strong hover:text-paper sm:grid"
          >
            <GitHubIcon className="size-4" />
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line text-paper xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-line bg-ink xl:hidden"
            >
              <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <ul className="grid grid-cols-2 gap-x-6 text-[16px]">
                  {navItems.map((item) => (
                    <li key={item.href} className={item.engineerOnly ? "eng-only" : undefined}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-line py-3 text-mute hover:text-paper"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between gap-3 sm:hidden">
                  <ModeToggle />
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="grid size-9 place-items-center rounded-full border border-line text-mute"
                  >
                    <GitHubIcon className="size-4" />
                  </a>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
    </header>
  );
}
