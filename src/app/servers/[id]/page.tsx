"use client";

import { use, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import InstallModal from "@/components/InstallModal";
import styles from "./page.module.css";

// Interface for Server Details
interface ServerDetail {
  id: string;
  title: string;
  author: string;
  isVerified: boolean;
  tags: string[];
  desc: string;
  views: string;
  connection: string;
  categoryTags: string[];
  about: string;
  howToInstall: string;
  logo: React.ReactNode;
  githubUrl: string;
  followCount: number;
}

// Map of all server details data
const DETAILED_SERVERS: Record<string, ServerDetail> = {
  "atlassian-jira-confluence": {
    id: "atlassian-jira-confluence",
    title: "Atlassian (Jira & Confluence)",
    author: "atlassian",
    isVerified: true,
    tags: ["Official"],
    desc: "Atlassian's official remote MCP server. Securely connects Jira and Confluence to Claude, Cursor, or any MCP client. OAuth-backed, production-ready.",
    views: "16,544 views",
    connection: "Local (stdio)",
    categoryTags: ["Auth Security"],
    about: "Atlassian (Jira & Confluence) is an official MCP server published by atlassian that provides AI assistants with tools and capabilities via the Model Context Protocol. Atlassian's official remote MCP server. Securely connects Jira and Confluence to Claude, Cursor, or any MCP client. OAuth-backed, production-ready. It is categorized under auth security. This server exposes 16 tools that AI clients can invoke during conversations and coding sessions.",
    howToInstall: "You can install Atlassian (Jira & Confluence) in your AI client of choice. Use the install panel on this page to get one-click setup for Cursor, Claude Desktop, VS Code, and other MCP-compatible clients. This server runs locally on your machine via the stdio transport.",
    githubUrl: "https://github.com/atlassian/mcp-server",
    followCount: 2,
    logo: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="#0052CC">
        <path d="M11.56 16.27l-4.14-4.14A1 1 0 0 0 6 12.84v6.32a1 1 0 0 0 1.71.7l4.14-4.14a1 1 0 0 0-.29-1.45zM22.29 12.84v-6.32a1 1 0 0 0-1.71-.7l-4.14 4.14a1 1 0 0 0 .29 1.45l4.14 4.14a1 1 0 0 0 1.42-.71z" />
      </svg>
    ),
  },
  "context7": {
    id: "context7",
    title: "Context7",
    author: "upstash",
    isVerified: true,
    tags: ["Official", "Remote", "Popular"],
    desc: "Boost your AI code assistant with Context7: inject real-time API documentation from OpenAPI schemas directly into your context window.",
    views: "17,042 views",
    connection: "Remote (HTTP)",
    categoryTags: ["API Documentation", "Databases"],
    about: "Context7 is an official MCP server published by upstash that enables AI assistants to directly interact with OpenAPI schemas and real-time database interfaces. It provides a simple, secure bridge to retrieve and document active API endpoints during live workspace conversations.",
    howToInstall: "Install Context7 by configuring your AI client connection details. Under settings, add a new remote client pointing to Context7's secure HTTPS endpoint. Detailed JSON configuration is available in the side panel.",
    githubUrl: "https://github.com/upstash/context7-mcp",
    followCount: 12,
    logo: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
  },
  "sequential-thinking": {
    id: "sequential-thinking",
    title: "Sequential Thinking",
    author: "anthropic",
    isVerified: true,
    tags: ["Official", "Remote", "Popular"],
    desc: "Break down complex problems with Sequential Thinking, a structured reasoning tool that executes step-by-step thinking patterns in real-time.",
    views: "8,719 views",
    connection: "Local (stdio)",
    categoryTags: ["Reasoning", "Math"],
    about: "Sequential Thinking is Anthropic's official tool for structured, step-by-step reasoning. It lets the model decompose complex challenges, track thinking history, and solve logical or mathematical problems systematically.",
    howToInstall: "Configure sequential-thinking as a local stdio client. You can use the Claude Desktop configuration file to automatically load this module on startup.",
    githubUrl: "https://github.com/modelcontextprotocol/servers",
    followCount: 85,
    logo: (
      <svg viewBox="0 0 24 24" width="40" height="40" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M7 7h10v10H7z" />
      </svg>
    ),
  },
  "duckduckgo": {
    id: "duckduckgo",
    title: "DuckDuckGo",
    author: "zhsama",
    isVerified: false,
    tags: ["Community", "Remote"],
    desc: "Integrate DuckDuckGo web search into your site with our MCP server, supporting features like Google... custom search and robust query controls.",
    views: "5,911 views",
    connection: "Remote (HTTP)",
    categoryTags: ["Web Search"],
    about: "DuckDuckGo MCP integration allows your agent to perform search queries without tracking. Access instant answers, search results, and text snippets to ground your model's responses in current factual data.",
    howToInstall: "Run this server as a community package. Install it via npm globally or run it directly using npx. Configuration details are described in the readme.",
    githubUrl: "https://github.com/zhsama/duckduckgo-mcp",
    followCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="40" height="40">
        <defs>
          <linearGradient id="avatarGradDetail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="12" fill="url(#avatarGradDetail)" transform="scale(1.6) translate(-4.5, -4.5)" />
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3 0-9 1.5-9 4.5V20h18v-1.5c0-3-6-4.5-9-4.5z" fill="#ffffff" transform="scale(1.2) translate(-2, -2)" />
      </svg>
    ),
  },
  "playwright-browser-automation": {
    id: "playwright-browser-automation",
    title: "Playwright Browser Automation",
    author: "microsoft",
    isVerified: true,
    tags: ["Official", "Popular"],
    desc: "Enhance software testing with Playwright MCP: Fast, reliable browser automation, an innovative alternative for test scenarios.",
    views: "8,012 views",
    connection: "Local (stdio)",
    categoryTags: ["Testing", "Automation"],
    about: "Playwright Browser Automation MCP server by Microsoft exposes full browser control (clicking, typing, taking screenshots, and inspecting elements) to your AI model. Ideal for writing browser test cases and visual checking.",
    howToInstall: "Ensure Playwright is installed locally. Run the Playwright MCP server using node. Add the connection to your Cursor or VS Code configuration.",
    githubUrl: "https://github.com/microsoft/playwright-mcp",
    followCount: 28,
    logo: (
      <svg viewBox="0 0 24 24" width="38" height="38">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A1F1" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" />
      </svg>
    ),
  },
  "hashicorp-terraform": {
    id: "hashicorp-terraform",
    title: "HashiCorp Terraform",
    author: "hashicorp",
    isVerified: true,
    tags: ["Official"],
    desc: "Official HashiCorp Terraform MCP server. Real-time access to provider documentation, module specifications, and Sentinel policies.",
    views: "13,842 views",
    connection: "Local (stdio)",
    categoryTags: ["DevOps", "Infrastructure"],
    about: "Terraform MCP server by HashiCorp provides real-time helper tools to write, format, and validate Terraform code. Access Terraform Registry provider documentation directly in your editor.",
    howToInstall: "Run the terraform mcp server binary locally. Set up the stdio channel in your IDE configuration block.",
    githubUrl: "https://github.com/hashicorp/terraform-mcp",
    followCount: 14,
    logo: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="#ffffff">
        <path d="M2.5 5.5l9 5.2v10.5l-9-5.2zM21.5 5.5l-9 5.2v10.5l9-5.2zM12 1.5l9 5.2-9 5.2-9-5.2z" opacity="0.85" />
      </svg>
    ),
  },
};

// Tool details list for Atlassian
const ATLASSIAN_TOOLS = [
  { name: "list_jira_projects", desc: "Retrieve a list of all Jira projects accessible to the authenticated user" },
  { name: "search_jira_issues", desc: "Search for Jira issues using JQL (Jira Query Language) with filters and pagination" },
  { name: "get_jira_issue", desc: "Get detailed information about a specific Jira issue by key or ID" },
  { name: "create_jira_issue", desc: "Create a new Jira issue with specified fields, project, and issue type" },
  { name: "update_jira_issue", desc: "Update an existing Jira issue's fields, status, assignee, or other properties" },
  { name: "add_jira_comment", desc: "Add a new comment to an existing Jira issue" },
  { name: "get_jira_comments", desc: "Retrieve all comments associated with a specific Jira issue" },
  { name: "transition_jira_issue", desc: "Change the status of a Jira issue (e.g. To Do -> In Progress)" },
  { name: "get_jira_user", desc: "Retrieve details of a Jira user by account ID" },
  { name: "list_confluence_spaces", desc: "List all accessible spaces in the Confluence instance" },
  { name: "get_confluence_space", desc: "Get details for a specific Confluence space by key" },
  { name: "search_confluence_pages", desc: "Search for pages in Confluence with keyword parameters" },
  { name: "get_confluence_page", desc: "Retrieve the full HTML/markup content of a specific Confluence page" },
  { name: "create_confluence_page", desc: "Create a new Confluence page within a space" },
  { name: "update_confluence_page", desc: "Edit or append markup to an existing Confluence page" },
  { name: "add_confluence_comment", desc: "Create a inline or footer comment on a Confluence page" }
];

// Fallback tools list for other servers
const DEFAULT_TOOLS = [
  { name: "get_server_status", desc: "Check if the server is active and return diagnostics" },
  { name: "list_capabilities", desc: "Retrieve capabilities and exposed functions lists" },
  { name: "execute_action", desc: "Trigger server actions with custom JSON payload schemas" },
  { name: "get_logs", desc: "Retrieve execution history logs for debug context" },
  { name: "clear_context", desc: "Clear server local thread memories and contexts" }
];

// Alternatives list
const ALTERNATIVES = [
  {
    id: "ghidramcp",
    title: "GhidraMCP",
    author: "LaurieWired",
    isVerified: false,
    rating: "7.8k",
    desc: "MCP server for Ghidra reverse engineering. Enables AI assistants to decompile binaries, analyze functions, and trace assembly instructions.",
    tags: ["Community", "Popular"],
    views: "425",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
  },
  {
    id: "hexstrike-ai",
    title: "HexStrike AI",
    author: "0x4m4",
    isVerified: false,
    rating: "7.3k",
    desc: "Advanced MCP server enabling AI agents to autonomously run 150+ security and penetration testing tools on targets.",
    tags: ["Community", "Popular"],
    views: "410",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    ),
  },
  {
    id: "snyk-agent-scan",
    title: "Snyk Agent Scan",
    author: "Snyk",
    isVerified: true,
    rating: "1.8k",
    desc: "Security scanner for AI agents, MCP servers, and workspace skills. Automatically scan files and codebase structures for vulnerabilities.",
    tags: ["Official"],
    views: "235",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    id: "semgrep",
    title: "Semgrep",
    author: "semgrep",
    isVerified: true,
    rating: "638",
    desc: "Semgrep is a leading code analysis tool that scans code for vulnerabilities, helping developers fix architectural issues early.",
    tags: ["Official", "Remote"],
    views: "1.3k",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
        <path d="M18 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4"></path>
      </svg>
    ),
  },
];

// Related Skills List
const RELATED_SKILLS = [
  { name: "confluence", desc: "Use Atlassian MCP server to interact with Confluence (pages, spaces, search,...)", downloads: "285" },
  { name: "search-company-knowledge", desc: "Search across company knowledge bases (Confluence, Jira, internal docs) t...", downloads: "2" },
  { name: "jira-ai", desc: "CLI tool for interacting with Atlassian Jira and Confluence instances", downloads: "1" },
  { name: "jira-expert", desc: "Atlassian Jira expert for creating and managing projects, planning, product...", downloads: "75" },
  { name: "backend-security-coder", desc: "Expert in secure backend coding practices specializing in input validation...", downloads: "24" },
  { name: "firebase", desc: "Firebase gives you a complete backend in minutes - auth, database, storage...", downloads: "20" },
];

// Install options sidebar details
const CLIENTS = [
  {
    name: "Cursor",
    sub: "One-click install",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#8e9099">
        <path d="M13.68 12.35l7.55 7.55a1 1 0 0 1-1.42 1.42l-7.55-7.55v4.94a1 1 0 0 1-2 0v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2h-4.94z" />
      </svg>
    ),
  },
  {
    name: "VS Code",
    sub: "One-click install",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#007acc">
        <path d="M1.5 6.5v11l6-5.5-6-5.5zm16 11l5-2.5V9l-5-2.5-6.5 5.5 6.5 5.5zm-8.5-5.5l6 5.5V6.5l-6 5.5z" />
      </svg>
    ),
  },
  {
    name: "Claude Desktop",
    sub: "Copy configuration",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#D97753">
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="5" r="3" />
        <circle cx="12" cy="19" r="3" />
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Claude Code",
    sub: "Copy CLI command",
    cli: true,
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#D97753">
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="5" r="3" />
        <circle cx="12" cy="19" r="3" />
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    sub: "Copy CLI command",
    cli: true,
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M12 2c0 5.52-4.48 10-10 10 5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" fill="url(#geminiGradDetail)" />
        <defs>
          <linearGradient id="geminiGradDetail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285f4" />
            <stop offset="50%" stopColor="#ea4335" />
            <stop offset="100%" stopColor="#fbcb05" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Codex",
    sub: "Copy CLI command",
    cli: true,
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#10a37f">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  {
    name: "Windsurf",
    sub: "Copy configuration",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#10B981">
        <path d="M4 20h16a1 1 0 0 1 1 1.5c-.5.5-1.5.5-2 .5H5c-.5 0-1.5 0-2-.5A1 1 0 0 1 4 20zm8-18l6 14H6L12 2z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    sub: "Add via Settings → Connectors",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#10a37f">
        <path d="M21.74 11.55c.08-.24.12-.5.12-.76a3.55 3.55 0 0 0-5.46-3.03 3.54 3.54 0 0 0-6.72-1.8 3.55 3.55 0 0 0-6.3 3.42A3.55 3.55 0 0 0 2.2 14.8a3.55 3.55 0 0 0 5.46 3.03 3.54 3.54 0 0 0 6.72 1.8 3.55 3.55 0 0 0 6.3-3.42 3.55 3.55 0 0 0 1.06-4.66z" />
      </svg>
    ),
  },
  {
    name: "Manual",
    sub: "Copy configuration",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8e9099" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
];

// Sidebar related list
const SIDEBAR_RELATED = [
  {
    name: "GhidraMCP",
    desc: "MCP server for Ghidra reverse engineering...",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      </svg>
    ),
  },
  {
    name: "HexStrike AI",
    desc: "Advanced MCP server enabling AI agents...",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#EF4444" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      </svg>
    ),
  },
  {
    name: "Snyk Agent Scan",
    desc: "Security scanner for AI agents...",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#4F46E5" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    name: "Semgrep",
    desc: "Semgrep code vulnerability scanning...",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2.5">
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
      </svg>
    ),
  },
  {
    name: "IAM Policy Autopilot",
    desc: "Analyze and clean AWS IAM roles locally...",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#FF9900" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
  },
];

export default function ServerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showAllTools, setShowAllTools] = useState(false);
  const [activeInstallServer, setActiveInstallServer] = useState<{
    id: string;
    title: string;
    author: string;
    isVerified: boolean;
    logo: React.ReactNode;
  } | null>(null);

  // Find server details or fallback to atlassian
  const server = DETAILED_SERVERS[id] || DETAILED_SERVERS["atlassian-jira-confluence"];
  
  // Decide which tools dataset to show
  const fullToolsList = id === "atlassian-jira-confluence" ? ATLASSIAN_TOOLS : DEFAULT_TOOLS;
  const displayedTools = showAllTools ? fullToolsList : fullToolsList.slice(0, 5);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbChevron}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
          <Link href="/" className={styles.breadcrumbLink}>Servers</Link>
          <span className={styles.breadcrumbChevron}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
          <span className={styles.breadcrumbActive}>{server.title}</span>
        </div>

        {/* Split Layout */}
        <div className={styles.splitLayout}>
          {/* Left Column (Primary Details) */}
          <div className={styles.leftCol}>
            {/* Identity details */}
            <div className={styles.serverHeader}>
              <div className={styles.logoContainer}>{server.logo}</div>
              <div className={styles.meta}>
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{server.title}</h1>
                  {server.tags.includes("Official") && (
                    <span className={styles.officialBadge}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Official
                    </span>
                  )}
                  {server.tags.includes("Community") && (
                    <span className={styles.communityBadge}>Community</span>
                  )}
                </div>

                <div className={styles.authorRow}>
                  <span className={styles.author}>{server.author}</span>
                  {server.isVerified && (
                    <span className={styles.verifiedCheck} title="Verified publisher">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className={styles.desc}>{server.desc}</p>

            {/* Metas / views row */}
            <div className={styles.badgeRow}>
              <span className={styles.metaBadge}>
                <span className={styles.metaBadgeIcon}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>
                {server.views}
              </span>

              <span className={styles.metaBadge}>
                <span className={styles.metaBadgeIcon}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </span>
                {server.connection}
              </span>

              {server.categoryTags.map((cat) => (
                <span key={cat} className={styles.categoryBadge}>
                  {cat}
                </span>
              ))}
            </div>

            {/* GitHub and follow buttons */}
            <div className={styles.actionButtons}>
              <a href={server.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGithub}>
                <span className={styles.btnGithubIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                GitHub
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <button className={styles.btnFollow}>
                <span className={styles.btnFollowIcon}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </span>
                Follow
                <span className={styles.followCount}>{server.followCount}</span>
              </button>
            </div>

            {/* Content box */}
            <div className={styles.infoBox}>
              <div className={styles.infoSection}>
                <h2 className={styles.boxHeading}>About {server.title}</h2>
                <p className={styles.boxText}>{server.about}</p>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.boxHeading}>How to install</h2>
                <p className={styles.boxText}>{server.howToInstall}</p>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.boxHeading}>License</h2>
                <p className={styles.boxText}>
                  {server.title} is released under the MIT license. This is a permissive open-source license, meaning you can freely use, modify, and distribute the software.
                </p>
              </div>
            </div>

            {/* Tools List Section */}
            <section className={styles.toolsSection}>
              <h2 className={styles.toolsHeader}>
                Tools <span className={styles.toolsCount}>({fullToolsList.length})</span>
              </h2>

              <div className={styles.toolsList}>
                {displayedTools.map((tool) => (
                  <div key={tool.name} className={styles.toolRow}>
                    <div className={styles.toolIcon}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <div className={styles.toolInfo}>
                      <span className={styles.toolName}>{tool.name}</span>
                      <span className={styles.toolDesc}>{tool.desc}</span>
                    </div>
                  </div>
                ))}

                {fullToolsList.length > 5 && (
                  <button
                    className={styles.btnToggleTools}
                    onClick={() => setShowAllTools(!showAllTools)}
                  >
                    {showAllTools ? (
                      <>
                        Show less
                        <span className={styles.btnToggleToolsIcon}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </span>
                      </>
                    ) : (
                      <>
                        Show all {fullToolsList.length} tools
                        <span className={styles.btnToggleToolsIcon}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </section>

            {/* Newsletter Box */}
            <section className={styles.newsletterBox}>
              <span className={styles.newsletterHeader}>
                <span className={styles.newsletterHeaderIcon}>
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                Free Weekly Newsletter
              </span>
              <h2 className={styles.newsletterTitle}>Get the next great MCP server in your inbox</h2>
              <p className={styles.newsletterSubtitle}>
                One curated MCP server pick plus install configs, every week. 2-minute read.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className={styles.newsletterInput}
                  aria-label="Email Address"
                />
                <button className={styles.btnSubscribe}>Subscribe — it's free</button>
              </div>
              <p className={styles.newsletterNote}>No spam. One-click unsubscribe.</p>
            </section>

            {/* Reviews Section */}
            <section className={styles.reviewsSection}>
              <div className={styles.reviewsHeaderRow}>
                <h2 className={styles.reviewsTitle}>Reviews</h2>
                <span className={styles.reviewsCount}>No reviews yet</span>
              </div>
              <div className={styles.reviewsBox}>
                <span className={styles.reviewsSignInText}>Sign in to leave a review</span>
                <button className={styles.btnReviewSignIn}>Sign In</button>
                <span className={styles.reviewsEmptyText}>
                  No reviews yet. Be the first to review {server.title}.
                </span>
              </div>
            </section>

            {/* Alternatives Grid */}
            <section className={styles.alternativesSection}>
              <h2 className={styles.alternativesHeader}>Alternatives</h2>
              <div className={styles.alternativesGrid}>
                {ALTERNATIVES.map((alt) => (
                  <Link href={`/servers/${alt.id}`} key={alt.id} className={styles.serverCard} style={{ margin: 0 }}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardHeaderLeft}>
                        <div className={styles.cardLogo}>{alt.logo}</div>
                        <div className={styles.cardMeta}>
                          <h3 className={styles.cardTitle}>{alt.title}</h3>
                          <div className={styles.cardAuthorRow}>
                            <span className={styles.cardAuthor}>{alt.author}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardRating}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="currentColor" strokeWidth="1">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>{alt.rating}</span>
                      </div>
                    </div>

                    <p className={styles.cardDesc}>{alt.desc}</p>

                    <div className={styles.cardTags}>
                      {alt.tags.map((tag) => (
                        <span key={tag} className={`${styles.tag} ${tag === "Popular" ? styles.tagPopular : styles.tagCommunity}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardStats}>
                        <div className={styles.statItem}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>{alt.views}</span>
                        </div>
                      </div>

                      <button
                        className={styles.btnInstall}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveInstallServer({
                            id: alt.id,
                            title: alt.title,
                            author: alt.author,
                            isVerified: alt.isVerified,
                            logo: alt.logo,
                          });
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Install
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Related Skills */}
            <section className={styles.skillsSection}>
              <div className={styles.skillsHeaderRow}>
                <h2 className={styles.skillsTitle}>Related Skills</h2>
                <a href="#" className={styles.skillsBrowseLink}>Browse all skills</a>
              </div>

              <div className={styles.skillsGrid}>
                {RELATED_SKILLS.map((skill) => (
                  <div key={skill.name} className={styles.skillCard}>
                    <div className={styles.skillIconRow}>
                      <div className={styles.skillIcon}>
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                      </div>
                      <h3 className={styles.skillTitle}>{skill.name}</h3>
                    </div>
                    <p className={styles.skillDesc}>{skill.desc}</p>
                    <div className={styles.skillFooter}>
                      <span className={styles.skillFooterIcon}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </span>
                      {skill.downloads}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar Install box) */}
          <div className={styles.rightCol}>
            {/* Install panel */}
            <div className={styles.sideBox}>
              <h2 className={styles.sideBoxTitle}>Install</h2>
              <div className={styles.clientList}>
                {CLIENTS.map((client) => (
                  <div 
                    key={client.name} 
                    className={styles.clientItem}
                    onClick={() => {
                      setActiveInstallServer({
                        id: server.id,
                        title: server.title,
                        author: server.author,
                        isVerified: server.isVerified,
                        logo: server.logo,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.clientLeft}>
                      <div className={styles.clientLogo}>
                        <span className={styles.clientLogoImg}>{client.logo}</span>
                      </div>
                      <div className={styles.clientInfo}>
                        <span className={styles.clientName}>{client.name}</span>
                        <span className={styles.clientSub}>{client.sub}</span>
                      </div>
                    </div>

                    <div className={styles.clientRight}>
                      {client.cli && <span className={styles.cliPill}>CLI</span>}
                      <span className={styles.clientChevron}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related tools in sidebar */}
            <div className={styles.sideBox}>
              <h2 className={styles.sideBoxTitle}>Related</h2>
              <div className={styles.clientList}>
                {SIDEBAR_RELATED.map((item) => (
                  <div key={item.name} className={styles.relatedItem}>
                    <div className={styles.relatedLogo}>{item.logo}</div>
                    <span className={styles.relatedName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publisher Card Box */}
            <div className={styles.sideBox}>
              <h2 className={styles.sideBoxTitle}>Publisher</h2>
              <div className={styles.publisherCard}>
                <div className={styles.publisherLeft}>
                  <div className={styles.publisherLogo}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#0052CC">
                      <path d="M11.56 16.27l-4.14-4.14A1 1 0 0 0 6 12.84v6.32a1 1 0 0 0 1.71.7l4.14-4.14a1 1 0 0 0-.29-1.45zM22.29 12.84v-6.32a1 1 0 0 0-1.71-.7l-4.14 4.14a1 1 0 0 0 .29 1.45l4.14 4.14a1 1 0 0 0 1.42-.71z" />
                    </svg>
                  </div>
                  <div className={styles.publisherMeta}>
                    <div className={styles.publisherNameRow}>
                      <span className={styles.publisherName}>{server.author}</span>
                      {server.isVerified && (
                        <span className={styles.verifiedCheck}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className={styles.publisherSub}>4 servers</span>
                  </div>
                </div>

                <span className={styles.publisherChevron}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer component */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <h3 className={styles.footerColTitle}>Browse Servers</h3>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>All MCP Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Best MCP Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Free MCP Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Remote MCP Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Awesome MCP Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Compare Servers</a></li>
              <li><a href="#" className={styles.footerLink}>Collections</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h3 className={styles.footerColTitle}>Categories</h3>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>Auth Security</a></li>
              <li><a href="#" className={styles.footerLink}>All Categories</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h3 className={styles.footerColTitle}>Agent Skills</h3>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>All Skills</a></li>
              <li><a href="#" className={styles.footerLink}>Skills Leaderboard</a></li>
              <li><a href="#" className={styles.footerLink}>Skill Categories</a></li>
              <li><a href="#" className={styles.footerLink}>Submit a Server</a></li>
              <li><a href="#" className={styles.footerLink}>Blog</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h3 className={styles.footerColTitle}>Install for</h3>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>Cursor</a></li>
              <li><a href="#" className={styles.footerLink}>Claude Desktop</a></li>
              <li><a href="#" className={styles.footerLink}>VS Code</a></li>
              <li><a href="#" className={styles.footerLink}>Windsurf</a></li>
              <li><a href="#" className={styles.footerLink}>ChatGPT</a></li>
              <li><a href="#" className={styles.footerLink}>All Clients</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Install Modal */}
      {activeInstallServer && (
        <InstallModal
          isOpen={!!activeInstallServer}
          onClose={() => setActiveInstallServer(null)}
          serverId={activeInstallServer.id}
          serverName={activeInstallServer.title}
          author={activeInstallServer.author}
          isVerified={activeInstallServer.isVerified}
          logo={activeInstallServer.logo}
        />
      )}
    </div>
  );
}
