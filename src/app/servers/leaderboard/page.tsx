"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

// Interface for Leaderboard Server Item
interface LeaderboardItem {
  rank: number;
  id: string;
  title: string;
  author: string;
  isVerified: boolean;
  stars: number;
  installs: number | null; // null represents "--"
  views: number;
  logo: React.ReactNode;
}

// Explicit top and bottom items from screenshots
const TOP_ITEMS: Omit<LeaderboardItem, "rank">[] = [
  {
    id: "markitdown",
    title: "Markitdown",
    author: "microsoft",
    isVerified: true,
    stars: 90388,
    installs: 96,
    views: 2595,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A1F1" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" />
      </svg>
    )
  },
  {
    id: "firecrawl",
    title: "Firecrawl",
    author: "mendableai",
    isVerified: true,
    stars: 89593,
    installs: 136,
    views: 3388,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#FF4F00">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    )
  },
  {
    id: "sequential-thinking",
    title: "Sequential Thinking",
    author: "anthropic",
    isVerified: true,
    stars: 80527,
    installs: 795,
    views: 8655,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M7 7h10v10H7z" />
      </svg>
    )
  },
  {
    id: "knowledge-graph-memory",
    title: "Knowledge Graph Memory",
    author: "anthropic",
    isVerified: true,
    stars: 80527,
    installs: 164,
    views: 2569,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#a855f7" strokeWidth="2.5">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="5" r="2" />
        <circle cx="20" cy="5" r="2" />
        <circle cx="4" cy="19" r="2" />
        <circle cx="20" cy="19" r="2" />
        <line x1="5.5" y1="6.5" x2="10.5" y2="10.5" />
        <line x1="18.5" y1="6.5" x2="13.5" y2="10.5" />
        <line x1="5.5" y1="17.5" x2="10.5" y2="13.5" />
        <line x1="18.5" y1="17.5" x2="13.5" y2="13.5" />
      </svg>
    )
  },
  {
    id: "filesystem",
    title: "Filesystem",
    author: "anthropic",
    isVerified: true,
    stars: 80527,
    installs: 123,
    views: 2134,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e2e8f0" strokeWidth="2.2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "browser-use",
    title: "Browser Use",
    author: "browser-use",
    isVerified: true,
    stars: 79942,
    installs: 24,
    views: 366,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00d2ff" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    )
  },
  {
    id: "context7",
    title: "Context7",
    author: "upstash",
    isVerified: true,
    stars: 48200,
    installs: 813,
    views: 17100,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    )
  }
];

const BOTTOM_ITEMS: Omit<LeaderboardItem, "rank">[] = [
  {
    id: "office-word",
    title: "Office Word",
    author: "gongrzhe",
    isVerified: false,
    stars: 1693,
    installs: 27,
    views: 1307,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#185ABD">
        <path d="M12 2L2 5v14l10 3 10-3V5L12 2zM10.8 16.5H8.7l-1.9-5.4-1.9 5.4H2.8l3.6-9.8h2.3l2.1 9.8z" />
      </svg>
    )
  },
  {
    id: "clerk",
    title: "Clerk",
    author: "clerk",
    isVerified: true,
    stars: 1673,
    installs: 1,
    views: 295,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#000000" stroke="#ffffff" strokeWidth="1">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5h-2v-2h-2v-2h6v2h-2v2z" />
      </svg>
    )
  },
  {
    id: "solana-agent-kit",
    title: "Solana Agent Kit",
    author: "sendaifun",
    isVerified: false,
    stars: 1622,
    installs: null,
    views: 360,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#14F195">
        <path d="M4 18h16v2H4zm0-6h16v2H4zm0-6h16v2H4z" />
      </svg>
    )
  },
  {
    id: "pg-aiguide",
    title: "pg-aiguide",
    author: "timescale",
    isVerified: true,
    stars: 1590,
    installs: 1,
    views: 278,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#F15A24">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
      </svg>
    )
  },
  {
    id: "n8n",
    title: "n8n",
    author: "leonardsellem",
    isVerified: false,
    stars: 1574,
    installs: 13,
    views: 1159,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#FF6D5A">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  }
];

// Helper to generate the remaining items programmatically
const generateLeaderboardData = (): LeaderboardItem[] => {
  const list: LeaderboardItem[] = [];

  // Seed with ranks
  // Ranks 1 to 7 are TOP_ITEMS
  // Ranks 96 to 100 are BOTTOM_ITEMS
  // We fill ranks 8 to 95 programmatically

  const midAuthors = ["mcp-community", "cloud-sync", "dev-helper", "agent-hub", "sqlite-adapters", "redis-hq", "notion-labs", "linear-app", "salesforce-partner", "sentry-io"];
  const midTitles = [
    "Kubernetes Manager", "Redis Cache Connector", "Notion Sync Tool", "Postgres Inspector", "Airtable Sync",
    "Salesforce Integrator", "Linear Workspaces", "Sentry Log Monitor", "Docker API client", "Slack Webhook Bot",
    "AWS S3 Explorer", "Google Sheets Sync", "Elasticsearch Helper", "Supabase Client", "Clerk Authentication",
    "Vercel Deployments", "Stripe Checkout Bot", "Algolia Search", "Gitlab Pipelines", "Prisma ORM helper",
    "SendGrid Email Delivery", "Twilio SMS Gateway", "Firebase Auth Connector", "Jira Cloud Boards", "Confluence Documentor",
    "Google Calendar Sync", "Figma Design Inspector", "Zoom Meetings Manager", "Trello Boards API", "Mailchimp Contacts Sync",
    "Asana Tasks Helper", "GitHub Issues Reader", "Shopify Storefront Connector", "HubSpot CRM Adapter", "Intercom Messenger API",
    "Zendesk Support Tickets", "Datadog Metrics Explorer", "Grafana Dashboards", "Prometheus Alarm API", "Segment Events Tracker",
    "Mixpanel Analytics Sync", "Amplitude Events Client", "Snyk Security Audits", "SonarQube Codesmelt Checker", "CircleCI Jobs Monitor",
    "Travis CI Checker", "Auth0 Tenant Manager", "Okta Directory Linker", "Pingdom Status Check", "PagerDuty Alerts Dispatch",
    "New Relic APM Sync", "AppSignal Monitor", "Loggly Log Sender", "Papertrail Streamer", "LaunchDarkly Feature Flags",
    "Split.io SDK Sync", "Google Analytics V4", "Plausible Stats Reader", "Fathom Analytics Client", "ClickUp Workspace Helper",
    "Monday.com Boards Integrator", "Wrike Project Tasks", "Basecamp Workspaces", "Shortcut Story Sync", "Pivotal Tracker Bot",
    "Microsoft Teams Channel Bot", "Discord Webhook Sender", "Telegram Bot API Client", "WhatsApp Business Integration", "Twitch Stream Status",
    "Spotify Playlists Manager", "YouTube Analytics Client", "Vimeo Videos Uploader", "Pinterest Boards Sync", "Twitter API v2 Bot",
    "LinkedIn Post publisher", "Reddit Subreddit Checker", "Medium Stories Scraper", "Ghost Blog Integrator", "WordPress XMLRPC Client",
    "Shopify Admin Sync", "WooCommerce Order Manager", "Magento Store Sync", "BigCommerce Products API", "PrestaShop Integration",
    "Webflow Sites Editor", "Squarespace Sync", "Wix Store Helper", "Render.com Services Manager"
  ];

  // Ranks 1-7
  TOP_ITEMS.forEach((item, idx) => {
    list.push({ ...item, rank: idx + 1 });
  });

  // Ranks 8-95
  let currentStars = 45000;
  for (let i = 8; i <= 95; i++) {
    const titleIndex = (i - 8) % midTitles.length;
    const authorIndex = (i - 8) % midAuthors.length;
    const title = midTitles[titleIndex];
    const author = midAuthors[authorIndex];

    currentStars -= Math.floor(Math.random() * 450) + 50;
    const installs = Math.random() > 0.08 ? Math.floor(Math.random() * 300) + 5 : null;
    const views = Math.floor(Math.random() * 4000) + 150;

    // Simple circle SVG with initials
    const initials = title.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#6366f1"];
    const bgColor = colors[i % colors.length];

    const logo = (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect width="24" height="24" rx="6" fill={bgColor} />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
          {initials}
        </text>
      </svg>
    );

    list.push({
      rank: i,
      id: `${title.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      title,
      author,
      isVerified: Math.random() > 0.6,
      stars: currentStars,
      installs,
      views,
      logo
    });
  }

  // Ranks 96-100
  BOTTOM_ITEMS.forEach((item, idx) => {
    list.push({ ...item, rank: idx + 96 });
  });

  return list;
};

const ALL_DATA = generateLeaderboardData();

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"Most Stars" | "Most Installed" | "Most Viewed">("Most Stars");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sorting
  const sortedData = [...ALL_DATA].sort((a, b) => {
    if (activeTab === "Most Installed") {
      const aVal = a.installs || 0;
      const bVal = b.installs || 0;
      return bVal - aVal;
    }
    if (activeTab === "Most Viewed") {
      return b.views - a.views;
    }
    // Most Stars
    return b.stars - a.stars;
  });

  const handleFeedbackClick = () => {
    setToastMessage("Thank you for your feedback!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/servers" className={styles.breadcrumbLink}>Servers</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>Leaderboard</span>
        </div>

        {/* Heading Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>🏆</span>
            MCP Server Leaderboard
          </h1>
          <p className={styles.subtitle}>
            Top 100 MCP servers ranked by GitHub stars. The most popular Model Context Protocol
            servers used by developers worldwide.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabButton} ${activeTab === "Most Stars" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("Most Stars")}
          >
            <svg className={styles.metricSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Most Stars
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "Most Installed" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("Most Installed")}
          >
            <svg className={styles.metricSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Most Installed
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "Most Viewed" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("Most Viewed")}
          >
            <svg className={styles.metricSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Most Viewed
          </button>
        </div>

        {/* Table Container */}
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={`${styles.th} ${styles.thRank}`}>#</th>
                  <th className={`${styles.th} ${styles.thServer}`}>Server</th>
                  <th className={`${styles.th} ${styles.thMetric}`}>Stars</th>
                  <th className={`${styles.th} ${styles.thMetric}`}>Installs</th>
                  <th className={`${styles.th} ${styles.thMetric}`}>Views</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => {
                  const rank = index + 1;
                  return (
                    <tr key={item.id} className={styles.tr}>
                      {/* Rank Cell */}
                      <td className={`${styles.td} ${styles.tdRank}`}>
                        {rank === 1 ? (
                          <span className={`${styles.trophyWrapper} ${styles.goldTrophy}`} title="Rank 1">
                            <svg className={styles.trophySvg} viewBox="0 0 24 24">
                              <path d="M18 2H6v2H2v6c0 3.31 2.69 6 6 6h1.22c.98 1.95 2.87 3.36 5.12 3.82V20H9v2h6v-2h-5.34v-2.18c2.25-.46 4.14-1.87 5.12-3.82H16c3.31 0 6-2.69 6-6V4h-4V2zM8 12H6a2 2 0 0 1-2-2V6h4v6zm10-2c0 1.1-.9 2-2 2h-2V6h4v4z" />
                            </svg>
                          </span>
                        ) : rank === 2 ? (
                          <span className={`${styles.trophyWrapper} ${styles.silverTrophy}`} title="Rank 2">
                            <svg className={styles.trophySvg} viewBox="0 0 24 24">
                              <path d="M18 2H6v2H2v6c0 3.31 2.69 6 6 6h1.22c.98 1.95 2.87 3.36 5.12 3.82V20H9v2h6v-2h-5.34v-2.18c2.25-.46 4.14-1.87 5.12-3.82H16c3.31 0 6-2.69 6-6V4h-4V2zM8 12H6a2 2 0 0 1-2-2V6h4v6zm10-2c0 1.1-.9 2-2 2h-2V6h4v4z" />
                            </svg>
                          </span>
                        ) : rank === 3 ? (
                          <span className={`${styles.trophyWrapper} ${styles.bronzeTrophy}`} title="Rank 3">
                            <svg className={styles.trophySvg} viewBox="0 0 24 24">
                              <path d="M18 2H6v2H2v6c0 3.31 2.69 6 6 6h1.22c.98 1.95 2.87 3.36 5.12 3.82V20H9v2h6v-2h-5.34v-2.18c2.25-.46 4.14-1.87 5.12-3.82H16c3.31 0 6-2.69 6-6V4h-4V2zM8 12H6a2 2 0 0 1-2-2V6h4v6zm10-2c0 1.1-.9 2-2 2h-2V6h4v4z" />
                            </svg>
                          </span>
                        ) : (
                          <span>{rank}</span>
                        )}
                      </td>

                      {/* Server Details */}
                      <td className={styles.td}>
                        <div className={styles.tdServer}>
                          <div className={styles.logoWrapper}>{item.logo}</div>
                          <div className={styles.serverMeta}>
                            <div className={styles.serverTitleRow}>
                              <Link href={`/servers/${item.id}`} className={styles.serverTitle}>
                                {item.title}
                              </Link>
                              {item.isVerified && (
                                <span className={styles.verifiedBadge} title="Verified publisher">
                                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <span className={styles.serverAuthor}>{item.author}</span>
                          </div>
                        </div>
                      </td>

                      {/* Stars */}
                      <td className={`${styles.td} ${styles.tdMetric} ${styles.starsVal}`}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {item.stars.toLocaleString()}
                      </td>

                      {/* Installs */}
                      <td className={`${styles.td} ${styles.tdMetric} ${styles.installsVal}`}>
                        {item.installs !== null ? (
                          <>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            {item.installs.toLocaleString()}
                          </>
                        ) : (
                          <span>—</span>
                        )}
                      </td>

                      {/* Views */}
                      <td className={`${styles.td} ${styles.tdMetric} ${styles.viewsVal}`}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {item.views.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Horizontal Navigation Links */}
        <div className={styles.horizontalLinks}>
          <Link href="/servers" className={styles.horizontalLink}>Browse All Servers</Link>
          <Link href="/servers" className={styles.horizontalLink}>Best MCP Servers</Link>
          <Link href="/skills/leaderboard" className={styles.horizontalLink}>Skills Leaderboard</Link>
          <Link href="/servers" className={styles.horizontalLink}>Categories</Link>
        </div>
      </main>

      {/* Footer Section */}
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
            <form className={styles.newsletterForm} onSubmit={(e) => { e.preventDefault(); setToastMessage("Subscribed successfully!"); setTimeout(() => setToastMessage(null), 3000); }}>
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

      {/* Floating Feedback Button */}
      <button className={styles.feedbackBtn} onClick={handleFeedbackClick}>
        <svg className={styles.feedbackIcon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Feedback
      </button>

      {/* Sleek Custom Toast */}
      {toastMessage && (
        <div className={styles.toast}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
