"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function SubmitServer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [npmPkg, setNpmPkg] = useState("");
  const [pypiPkg, setPypiPkg] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Submit a Server</h1>
          <p className={styles.subtitle}>
            Get your MCP server listed on the directory. We'll auto-pull metadata from GitHub and publish within 24 hours.
          </p>

          {isSubmitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className={styles.successTitle}>Submission Received!</h3>
              <p className={styles.successDesc}>
                Thank you for submitting your MCP server. We are pulling metadata from GitHub and will review it within 24 hours.
              </p>
              <button onClick={() => { setIsSubmitted(false); setRepoUrl(""); setNpmPkg(""); setPypiPkg(""); setDesc(""); setEmail(""); }} className={styles.btnReset}>
                Submit another server
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formCard}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  GitHub Repository URL <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    className={styles.input}
                    placeholder="https://github.com/org/mcp-server"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                  />
                </div>
                <span className={styles.helperText}>
                  We'll auto-detect: name, description, language, license, tools, and README
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>npm Package (optional)</label>
                <input
                  type="text"
                  className={styles.inputBlock}
                  placeholder="@org/mcp-server"
                  value={npmPkg}
                  onChange={(e) => setNpmPkg(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>PyPI Package (optional)</label>
                <input
                  type="text"
                  className={styles.inputBlock}
                  placeholder="mcp-server-name"
                  value={pypiPkg}
                  onChange={(e) => setPypiPkg(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Short Description (optional)</label>
                <input
                  type="text"
                  className={styles.inputBlock}
                  placeholder="One sentence, max 100 characters"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <span className={styles.helperText}>
                  If left empty, we'll generate one from the README
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Your Email (optional)</label>
                <input
                  type="email"
                  className={styles.inputBlock}
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles.helperText}>
                  We'll notify you when your server is published
                </span>
              </div>

              <button type="submit" disabled={isSubmitting} className={styles.btnSubmit}>
                {isSubmitting ? "Submitting..." : "Submit for Review →"}
              </button>
            </form>
          )}

          {/* What happens next? */}
          <div className={styles.stepsSection}>
            <h2 className={styles.stepsTitle}>What happens next?</h2>
            <ul className={styles.stepsList}>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.stepText}>We pull metadata from GitHub (name, description, stars, language, license, README)</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.stepText}>Auto-detect tools by analyzing the server's MCP implementation</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.stepText}>Generate install configurations for all major clients</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.stepText}>Review for quality and accuracy (within 24 hours)</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.stepText}>Publish to the directory — live and searchable</span>
              </li>
            </ul>
          </div>

          {/* Already listed? */}
          <div className={styles.claimCard}>
            <h3 className={styles.claimTitle}>Already listed?</h3>
            <p className={styles.claimDesc}>
              If your server is already in the directory (added via auto-discovery from the official{" "}
              <span className={styles.linkText}>MCP Registry</span>), you can claim it to get a verified badge and edit access. Email us at{" "}
              <a href="mailto:hello@mcp.directory" className={styles.mailLink}>hello@mcp.directory</a>.
            </p>
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
