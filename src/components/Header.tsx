"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
          <img src={mounted && theme === "light" ? "/logo-dark.svg" : "/logo-light.svg"} alt="agent1o1" className={styles.logoImg} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <Link href="/servers" className={styles.navLink}>
              Servers
              <svg className={styles.navChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <div className={styles.dropdownMenu}>
              <Link href="/servers" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="5" rx="1"></rect>
                    <rect x="2" y="11" width="20" height="5" rx="1"></rect>
                    <rect x="2" y="19" width="20" height="5" rx="1"></rect>
                    <path d="M6 5.5h.01M6 13.5h.01M6 21.5h.01"></path>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Browse All</div>
                  <div className={styles.dropdownDesc}>Search and filter servers</div>
                </div>
              </Link>
              <Link href="/servers/leaderboard" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                    <path d="M12 2a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Leaderboard</div>
                  <div className={styles.dropdownDesc}>Top 100 by stars</div>
                </div>
              </Link>
              <Link href="/servers/categories" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Categories</div>
                  <div className={styles.dropdownDesc}>Browse by category</div>
                </div>
              </Link>
              <Link href="/servers/submit" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Submit Server</div>
                  <div className={styles.dropdownDesc}>Add yours to the directory</div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.navItem}>
            <Link href="/skills" className={styles.navLink}>
              Skills
              <svg className={styles.navChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <div className={styles.dropdownMenu}>
              <Link href="/skills" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"></path>
                    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"></path>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Browse All</div>
                  <div className={styles.dropdownDesc}>Search agent skills</div>
                </div>
              </Link>
              <Link href="/skills/leaderboard" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                    <path d="M12 2a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Leaderboard</div>
                  <div className={styles.dropdownDesc}>Top skills by installs</div>
                </div>
              </Link>
              <Link href="/skills/submit" className={styles.dropdownItem}>
                <div className={styles.dropdownIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div className={styles.dropdownMeta}>
                  <div className={styles.dropdownTitle}>Submit Skill</div>
                  <div className={styles.dropdownDesc}>Share your skill</div>
                </div>
              </Link>
            </div>
          </div>

          <Link href="/clients" className={styles.navLink}>Clients</Link>
          <Link href="/tools" className={styles.navLink}>Tools</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
        </nav>

        {/* Actions (Desktop & Mobile) */}
        <div className={styles.navActions}>
          <button 
            className={styles.themeToggle} 
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {mounted && theme === "light" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
          
          <Link href="/submit" className={styles.btnSubmit}>Submit Server</Link>

          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className={styles.btnSignIn}>
                <svg className={styles.btnSignInIcon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Sign In</span>
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className={styles.btnSubmit}>Sign Up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>

          {/* Mobile Menu Toggle Button */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${styles.menuIcon} ${isMenuOpen ? styles.isOpen : ""}`}
            >
              <line x1="3" y1="6" x2="21" y2="6" className={styles.lineTop}></line>
              <line x1="3" y1="12" x2="21" y2="12" className={styles.lineMiddle}></line>
              <line x1="3" y1="18" x2="21" y2="18" className={styles.lineBottom}></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <Link href="/servers" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Servers
            <svg className={styles.mobileNavChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
          <Link href="/skills" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Skills
            <svg className={styles.mobileNavChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
          <Link href="/clients" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Clients
            <svg className={styles.mobileNavChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
          <Link href="/tools" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Tools
            <svg className={styles.mobileNavChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Blog
            <svg className={styles.mobileNavChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </nav>

        <div className={styles.mobileActions}>
          <Link href="/submit" className={styles.mobileBtnSubmit} onClick={() => setIsMenuOpen(false)}>
            Submit Server
          </Link>
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className={styles.mobileBtnSignIn} onClick={() => setIsMenuOpen(false)}>
                <svg className={styles.btnSignInIcon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
