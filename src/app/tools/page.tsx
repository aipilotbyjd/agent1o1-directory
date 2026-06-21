"use client";

import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

interface ToolItem {
  id: string;
  name: string;
  description: string;
  subText: string;
  icon: React.ReactNode;
  active: boolean;
}

const TOOLS: ToolItem[] = [
  {
    id: "config-converter",
    name: "MCP Config Converter",
    description: "Convert MCP server configs between Claude Desktop, Cursor, VS Code, Codex CLI, and 4 more.",
    subText: "Pick a source format, paste your config, get the equivalent in any of 8 target formats. Handles JSON \u2194 TOML for Codex CLI, the mcpServers\u2192servers rename for VS Code, type:'stdio' for Cursor, and serverUrl/httpUrl aliases for Windsurf/Gemini. Five priority migration pairs have dedicated pages with conversion notes.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3L21 7L17 11" />
        <path d="M3 7H21" />
        <path d="M7 21L3 17L7 13" />
        <path d="M21 17H3" />
      </svg>
    ),
    active: true,
  },
  {
    id: "claude-desktop-validator",
    name: "Claude Desktop Config Validator",
    description: "Paste your claude_desktop_config.json. Find why MCP servers aren't loading.",
    subText: "Diagnostic for the silent-fail problem: 12 deterministic checks for JSON syntax, MSIX path mismatch, env-var leaks, Windows path issues, schema validation. Runs entirely in your browser \u2014 your config never leaves the page.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    active: true,
  },
  {
    id: "cursor-validator",
    name: "Cursor MCP Config Validator",
    description: "Paste your Cursor config. Find and fix configuration syntax and path errors.",
    subText: "Checks Cursor specific config requirements like type: \"stdio\", absolute paths to executables, environment variables formatting, and syntax validation. Runs fully client-side.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    active: true,
  },
  {
    id: "vscode-validator",
    name: "VS Code MCP Config Validator",
    description: "Validate your workspace or user-level VS Code configuration files.",
    subText: "Verifies settings.json and workspace configuration formats, ensuring top-level keys match GitHub Copilot and other agent expectations. Runs client-side.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    active: true,
  },
  {
    id: "cline-validator",
    name: "Cline MCP Config Validator",
    description: "Paste your cline_mcp_settings.json. Validates the disabled and alwaysAllow extensions.",
    subText: "Validates Cline's mcpServers schema with its two extension fields (disabled bool, alwaysAllow string array) and standard structural checks. Source: docs.cline.bot/mcp/configuring-mcp-servers.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    active: true,
  },
  {
    id: "recommender",
    name: "MCP & Skill Recommender",
    description: "What's the right MCP server or Claude Skill for your task?",
    subText: "Pick your role and task \u2014 get 5 hand-ranked picks from our catalog of 2,000+ MCP servers and 8,600+ skills with reasoning, install commands, and links to the full record.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    active: false,
  },
  {
    id: "debugger",
    name: "MCP Server Debugger",
    description: "Paste a URL or stdio command. See why your MCP isn't responding.",
    subText: "Probes the full handshake \u2014 DNS, TLS, OPTIONS/CORS, MCP initialize, capability negotiation, tools/list, schema validation, sample tool call \u2014 and returns a verdict with the exact failure reason and copy-paste fix.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21V7a4 4 0 0 1 8 0v14" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="6" y1="16" x2="18" y2="16" />
      </svg>
    ),
    active: false,
  },
  {
    id: "estimator",
    name: "Subscription vs API Cost Estimator",
    description: "Should you be on Pro, Max5, Max20, or API? Calculate the break-even.",
    subText: "Drop in your usage.json or describe your typical day \u2014 see your effective cost on each plan and get a recommendation. No login. Doesn't transmit your transcripts.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    active: false,
  },
  {
    id: "template-generator",
    name: "CLAUDE.md Template Generator",
    description: "Pick your stack. Get a token-budgeted CLAUDE.md that follows the rules every viral repo uses.",
    subText: "Stack-aware templates (Python, Next.js, Rust, Go, TypeScript) with built-in lint for >1k token bloat, missing test commands, and contradictory rules.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M7 7h10v10H7z" />
      </svg>
    ),
    active: false,
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Are these tools really free?",
    answer: "Yes \u2014 every tool on /tools/ is free, no login required, no email gate. We monetize the directory itself; the tools exist to help builders and to bring traffic to Agent1o1 Directory. Built-with-care, not built-to-upsell.",
  },
  {
    question: "Do you store my config or transcripts?",
    answer: "No. Tools that take sensitive input (claude_desktop_config.json, usage.json, transcripts) run entirely client-side in your browser. Your data never leaves your machine. Tools that take public input (GitHub URLs, MCP server slugs) only fetch public data on your behalf.",
  },
  {
    question: "Can I use these tools without an Anthropic API key?",
    answer: "Most tools don't need one. The Skill Activation Tester (in development) uses our own API key on your behalf, with rate limits to prevent abuse. The token counter and config validator use public tokenizers and JSON schema; no API key required.",
  },
  {
    question: "Is there an MCP server that exposes these tools?",
    answer: "Yes \u2014 @mcp-directory/recommender ships as an MCP server you can install in Claude Code, Cursor, Cline, or any MCP client. It exposes our directory's search and audit functions as tools. Available via npm.",
  },
  {
    question: "Can I request a tool that doesn't exist yet?",
    answer: "Yes! Submit an issue on our GitHub repository or contact us via feedback. We're constantly building tools based on what the community needs on Reddit, Hacker News, and GitHub.",
  }
];

export default function ToolsPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className={styles.main}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span>Agent1o1 Directory</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>Tools</span>
        </div>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Free MCP & Claude Code Tools</h1>
          <p className={styles.description}>
            Utilities built for the problems we kept seeing on r/ClaudeAI, HN, and GitHub. No login, no install, no upsell. Every tool that takes sensitive input runs in your browser \u2014 your data stays on your machine.
          </p>
        </div>

        {/* Heading Tools */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tools</h2>
        </div>

        {/* Tools Grid */}
        <div className={styles.grid}>
          {TOOLS.map((tool) => {
            if (tool.active) {
              return (
                <Link key={tool.id} href={`/tools/${tool.id}`} className={`${styles.card} ${styles.cardActive}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconContainer}>
                      {tool.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{tool.name}</h3>
                  </div>

                  <p className={styles.cardDesc}>{tool.description}</p>
                  <p className={styles.cardSubText}>{tool.subText}</p>

                  <div className={styles.cardAction}>
                    <span>Open tool</span>
                    <svg className={styles.actionArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              );
            } else {
              return (
                <div key={tool.id} className={styles.card}>
                  <span className={styles.soonBadge}>Soon</span>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconContainer}>
                      {tool.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{tool.name}</h3>
                  </div>

                  <p className={styles.cardDesc}>{tool.description}</p>
                  <p className={styles.cardSubText}>{tool.subText}</p>
                </div>
              );
            }
          })}
        </div>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently asked</h2>
          <div className={styles.faqGrid}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search Helper Box */}
        <div className={styles.searchBox}>
          <div className={styles.searchBoxIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div className={styles.searchBoxContent}>
            <h4 className={styles.searchBoxTitle}>Looking for something else?</h4>
            <p className={styles.searchBoxText}>
              Browse the full directory: 2,000+ MCP servers, 8,600+ Claude Skills, or read the blog for deep-dives.
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
