"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function SignIn() {
  const [isChecked, setIsChecked] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
          setTheme(newTheme || "dark");
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const defaultEmail = provider === "google" ? "google-user@mcp.directory" : "github-user@mcp.directory";
    const email = window.prompt(`Enter your email to sign in via ${provider.toUpperCase()}:`, defaultEmail);
    if (!email) return;

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, provider }),
      });
      if (res.ok) {
        const user = await res.json();
        alert(`Signed in successfully as ${user.email}!`);
      } else {
        const err = await res.json();
        alert(`Error signing in: ${err.error}`);
      }
    } catch (error: any) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.signInCard}>
          {/* Logo */}
          <img 
            src={mounted && theme === "light" ? "/logo-dark.svg" : "/logo-light.svg"} 
            alt="agent1o1" 
            className={styles.logoImg} 
          />

          {/* Heading & Subtitle */}
          <h1 className={styles.title}>Sign in to Agent1o1 Directory</h1>
          <p className={styles.subtitle}>
            Track your installed servers and get personalized recommendations.
          </p>

          {/* Social Auth Buttons */}
          <div className={styles.authButtonsContainer}>
            <button className={styles.authButton} onClick={() => handleSocialSignIn("google")}>
              <span className={styles.authIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
              </span>
              Continue with Google
            </button>

            <button className={styles.authButton} onClick={() => handleSocialSignIn("github")}>
              <span className={styles.authIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </span>
              Continue with GitHub
            </button>
          </div>

          {/* Email Updates Checkbox */}
          <div className={styles.checkboxWrapper}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span className={styles.checkboxText}>
                Send me occasional product updates about new MCP servers and ecosystem news. You can
                unsubscribe anytime.
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <h5 className={styles.footerColTitle}>Directory</h5>
              <div className={styles.footerLinks}>
                <Link href="/servers" className={styles.footerLink}>Browse Servers</Link>
                <Link href="/skills" className={styles.footerLink}>Browse Skills</Link>
                <Link href="/clients" className={styles.footerLink}>MCP Clients</Link>
                <Link href="/categories" className={styles.footerLink}>Categories</Link>
                <Link href="/collections" className={styles.footerLink}>Collections</Link>
                <Link href="/publishers" className={styles.footerLink}>Publishers</Link>
                <Link href="/compare" className={styles.footerLink}>Compare Servers</Link>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h5 className={styles.footerColTitle}>Top Lists</h5>
              <div className={styles.footerLinks}>
                <Link href="/leaderboard" className={styles.footerLink}>Server Leaderboard</Link>
                <Link href="/best" className={styles.footerLink}>Best MCP Servers</Link>
                <Link href="/awesome" className={styles.footerLink}>Awesome MCP Servers</Link>
                <Link href="/free" className={styles.footerLink}>Free MCP Servers</Link>
                <Link href="/remote" className={styles.footerLink}>Remote MCP Servers</Link>
                <Link href="/skills-leaderboard" className={styles.footerLink}>Skills Leaderboard</Link>
                <Link href="/skill-categories" className={styles.footerLink}>Skill Categories</Link>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h5 className={styles.footerColTitle}>Resources</h5>
              <div className={styles.footerLinks}>
                <Link href="/servers/submit" className={styles.footerLink}>Submit Server</Link>
                <Link href="/skills/submit" className={styles.footerLink}>Submit Skill</Link>
                <Link href="/blog" className={styles.footerLink}>Blog</Link>
                <Link href="/about" className={styles.footerLink}>About</Link>
                <Link href="/registry" className={styles.footerLink}>Official Registry</Link>
                <Link href="/spec" className={styles.footerLink}>MCP Spec</Link>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h5 className={styles.footerColTitle}>Newsletter</h5>
              <p className={styles.footerNewsletterText}>
                Get weekly MCP server updates and new tools delivered to your inbox.
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  className={styles.newsletterInput}
                  placeholder="you@email.com"
                  required
                />
                <button type="submit" className={styles.newsletterSubmit}>Subscribe</button>
              </form>
            </div>
          </div>

          <div className={styles.footerAbout}>
            <h6 className={styles.footerAboutTitle}>About Agent1o1 Directory</h6>
            <p className={styles.footerAboutText}>
              Agent1o1 Directory is the largest curated directory of MCP (Model Context Protocol) servers and agent skills. Discover, compare, and one-click install servers for Cursor IDE, VS Code, Claude Desktop, Claude Code, Codex, Gemini CLI, ChatGPT, and other AI development tools. Browse 1,653+ publishers and thousands of servers across categories like developer tools, databases, AI/ML, productivity, and more.
            </p>
          </div>

          <div className={styles.footerCategories}>
            <h6 className={styles.footerCategoriesTitle}>Top MCP Servers by Category</h6>
            <div className={styles.footerCategoriesRow}>
              <Link href="/category/official" className={styles.footerCategoryLink}>Best Official MCP</Link>
              <Link href="/category/remote" className={styles.footerCategoryLink}>Best Remote MCP</Link>
              <Link href="/category/ai-ml" className={styles.footerCategoryLink}>Best MCP for AI and Machine Learning</Link>
              <Link href="/category/analytics" className={styles.footerCategoryLink}>Best MCP for Analytics and Data</Link>
              <Link href="/category/browser" className={styles.footerCategoryLink}>Best MCP for Browser Automation</Link>
              <Link href="/category/cloud" className={styles.footerCategoryLink}>Best MCP for Cloud Platforms</Link>
              <Link href="/category/communication" className={styles.footerCategoryLink}>Best MCP for Communication</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Feedback Button */}
      <button className={styles.feedbackBtn}>
        <svg className={styles.feedbackIcon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Feedback
      </button>
    </div>
  );
}
