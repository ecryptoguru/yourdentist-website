"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { clinicInfo, navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-premium rounded-2xl px-5 py-3"
              : "bg-transparent px-0 py-0",
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
                "bg-teal-700",
              )}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 5 3 7.5C10.5 18 11 20 12 20s1.5-2 3-4.5c1.5-2.5 3-5 3-7.5 0-3.5-2.5-6-6-6z" />
                <path d="M12 8v4" />
                <circle
                  cx="12"
                  cy="8"
                  r="1.5"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span
                className={cn(
                  "font-heading font-semibold text-base leading-tight tracking-tight transition-colors",
                  "text-slate-900",
                )}
              >
                YourDentist
              </span>
              <span
                className={cn(
                  "block text-[11px] tracking-wide uppercase transition-colors",
                  "text-slate-500",
                )}
              >
                Laser Dental Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 h-10 flex items-center rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-teal-700"
                      : "text-slate-600 hover:text-slate-900",
                    "nav-link-underline",
                    isActive && "active",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href={clinicInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
            >
              <Button
                size="sm"
                className="bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg px-5 h-10 text-sm font-medium transition-all duration-300 shadow-none hover:shadow-premium group"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Appointment
              </Button>
            </a>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="lg:hidden"
                aria-label="Open menu"
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-700 hover:bg-slate-100/80 rounded-lg h-10 w-10"
                  />
                }
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] bg-white border-l border-slate-200/80"
                showCloseButton={false}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-10 pt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 5 3 7.5C10.5 18 11 20 12 20s1.5-2 3-4.5c1.5-2.5 3-5 3-7.5 0-3.5-2.5-6-6-6z" />
                          <path d="M12 8v4" />
                          <circle
                            cx="12"
                            cy="8"
                            r="1.5"
                            fill="currentColor"
                            stroke="none"
                          />
                        </svg>
                      </div>
                      <span className="font-heading font-semibold text-base text-slate-900">
                        YourDentist
                      </span>
                    </div>
                    <SheetClose
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-lg hover:bg-slate-100/80"
                        />
                      }
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </SheetClose>
                  </div>

                  <nav className="flex flex-col gap-0.5 flex-1">
                    {navLinks.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        pathname.startsWith(link.href + "/");
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200",
                            isActive
                              ? "text-teal-700 bg-teal-50/60"
                              : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/60",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="pt-5 border-t border-slate-200/80 space-y-3">
                    <a
                      href={clinicInfo.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg h-11 text-sm font-medium">
                        <Phone className="w-4 h-4" />
                        Book Appointment
                      </Button>
                    </a>
                    <a
                      href={clinicInfo.phoneLink}
                      className="flex items-center justify-center gap-2 text-slate-500 hover:text-teal-700 text-sm py-2 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
