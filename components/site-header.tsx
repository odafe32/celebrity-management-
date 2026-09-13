"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchModal } from "@/components/search-modal";
import { NAV_ITEMS, SERVICES, SITE_NAME } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const servicesRef = React.useRef<HTMLDivElement>(null);

  // Close menus on route change. This is the React-recommended "adjust state
  // when a prop changes" pattern — calling setState during render is safe
  // because React discards the in-progress render and re-renders immediately.
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevPath, setPrevPath] = React.useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setSearchOpen(false);
  }

  // Ctrl/Cmd+K to open search
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/logo.png"
              alt={`${SITE_NAME} logo`}
              width={36}
              height={36}
              priority
              className="rounded-full object-cover"
              style={{ width: "auto", height: "auto" }}
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading text-xl font-bold tracking-wide text-foreground"
          >
            {SITE_NAME}
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const hasDropdown = !!item.children;

            if (hasDropdown) {
              return (
                <div key={item.href} ref={servicesRef} className="relative">
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border/80 bg-popover p-2 shadow-2xl ring-1 ring-primary/10"
                      >
                        {SERVICES.map((service, sIdx) => {
                          const svcActive = pathname === service.href || pathname.startsWith(service.href + "/");
                          return (
                          <motion.div
                            key={service.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sIdx * 0.03 }}
                          >
                            <Link
                              href={service.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-foreground",
                                svcActive ? "text-primary" : "text-foreground/80"
                              )}
                            >
                              {service.label}
                            </Link>
                          </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Search celebrities"
          >
            <Search className="size-4" />
          </button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>

    {/* Mobile menu - rendered outside header to avoid backdrop-blur stacking context */}
    <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] cursor-pointer bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-dvh w-80 max-w-[85vw] cursor-default overflow-y-auto border-l border-border bg-card shadow-2xl lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between p-6 pb-0">
                <span className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Image
                    src="/logo.png"
                    alt={`${SITE_NAME} logo`}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                    style={{ width: "auto", height: "auto" }}
                  />
                  {SITE_NAME}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-1 px-6 pb-6">
                {NAV_ITEMS.map((item) => {
                  if (item.children) {
                    return (
                      <div key={item.href} className="flex flex-col">
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-200",
                              mobileServicesOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 flex flex-col border-l border-border pl-3">
                                {item.children.map((child) => {
                                  const childActive = pathname === child.href || pathname.startsWith(child.href + "/");
                                  return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                                      childActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary hover:text-foreground",
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "text-primary"
                          : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
