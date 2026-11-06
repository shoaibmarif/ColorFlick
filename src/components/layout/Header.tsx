import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BarChart3, ChevronDown, Menu, Settings, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_GROUPS, SITE_LINKS } from "./nav";

interface HeaderProps {
  onOpenSettings: () => void;
}

const iconButton =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white";

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Lock scroll + Escape for the mobile drawer.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const groupActive = (id: string) =>
    NAV_GROUPS.find((g) => g.id === id)?.items.some(
      (i) => i.to === location.pathname,
    );

  const topLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-zinc-900 dark:text-white"
        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav
          ref={navRef}
          aria-label="Main"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_GROUPS.map((group) => {
            const isOpen = openMenu === group.id;
            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-${group.id}`}
                  onClick={() => setOpenMenu(isOpen ? null : group.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isOpen || groupActive(group.id)
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    id={`menu-${group.id}`}
                    className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-pop dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            aria-current={
                              location.pathname === item.to ? "page" : undefined
                            }
                            className="block rounded-lg px-3 py-2 hover:bg-zinc-100 aria-[current=page]:bg-zinc-100 dark:hover:bg-zinc-800 dark:aria-[current=page]:bg-zinc-800"
                          >
                            <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {item.label}
                            </span>
                            {item.desc && (
                              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                                {item.desc}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          <NavLink
            to="/daily-color-challenge"
            className={(a) => `${topLink(a)} inline-flex items-center gap-1.5`}
          >
            <span
              className="h-2 w-2 rounded-full bg-coral-500"
              aria-hidden="true"
            />
            Daily
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/statistics"
            className={`${iconButton} hidden sm:inline-flex`}
            aria-label="Your statistics"
            title="Statistics"
          >
            <BarChart3 className="h-[18px] w-[18px]" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenSettings}
            className={iconButton}
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`${iconButton} md:hidden`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div
              className="absolute inset-0 bg-zinc-950/40 animate-fadeInOverlay"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-pop animate-slideLeft dark:bg-zinc-950">
              <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
                <Logo onClick={() => setMobileOpen(false)} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={iconButton}
                  aria-label="Close menu"
                  autoFocus
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto px-4 py-4"
              >
                <Link
                  to="/daily-color-challenge"
                  className="mb-6 flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  <span>
                    <span className="block text-sm font-medium">
                      Daily challenge
                    </span>
                    <span className="block text-xs text-zinc-500">
                      Ten new rounds every day
                    </span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
                {NAV_GROUPS.map((group) => (
                  <div key={group.id} className="mb-6">
                    <p className="eyebrow mb-2 px-1">{group.label}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            aria-current={
                              location.pathname === item.to ? "page" : undefined
                            }
                            className="block rounded-lg px-1 py-2 text-[15px] text-zinc-800 aria-[current=page]:font-semibold dark:text-zinc-200"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mb-6">
                  <p className="eyebrow mb-2 px-1">More</p>
                  <ul>
                    <li>
                      <Link
                        to="/statistics"
                        className="block px-1 py-2 text-[15px] text-zinc-800 dark:text-zinc-200"
                      >
                        Your statistics
                      </Link>
                    </li>
                    {SITE_LINKS.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="block px-1 py-2 text-[15px] text-zinc-800 dark:text-zinc-200"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
};
