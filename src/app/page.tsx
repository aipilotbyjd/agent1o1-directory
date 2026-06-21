"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import InstallModal from "@/components/InstallModal";
import styles from "./page.module.css";

// Typing animation words
const WORDS = ["AI Tool", "MCP Server", "AI Skill", "AI Client"];

// Interface for Popular Servers
interface Server {
  id: string;
  title: string;
  author: string;
  isVerified: boolean;
  rating?: string;
  viewsTotal?: string;
  desc: string;
  tags: string[];
  views: string;
  downloads: string;
  logo: React.ReactNode;
}

// Popular Servers Data
const SERVERS: Server[] = [
  {
    id: "atlassian-jira-confluence",
    title: "Atlassian (Jira & Confluence)",
    author: "atlassian",
    isVerified: true,
    viewsTotal: "16.5k",
    desc: "Atlassian's official remote MCP server. Securely connects Jira and Confluence to Claude, Cursor, or...",
    tags: ["Official"],
    views: "16.5k",
    downloads: "898",
    logo: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#0052CC">
        <path d="M11.56 16.27l-4.14-4.14A1 1 0 0 0 6 12.84v6.32a1 1 0 0 0 1.71.7l4.14-4.14a1 1 0 0 0-.29-1.45zM22.29 12.84v-6.32a1 1 0 0 0-1.71-.7l-4.14 4.14a1 1 0 0 0 .29 1.45l4.14 4.14a1 1 0 0 0 1.42-.71z" />
      </svg>
    ),
  },
  {
    id: "context7",
    title: "Context7",
    author: "upstash",
    isVerified: true,
    rating: "48.2k",
    desc: "Boost your AI code assistant with Context7: inject real-time API documentation from OpenAPI...",
    tags: ["Official", "Remote", "Popular"],
    views: "17.0k",
    downloads: "813",
    logo: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
  },
  {
    id: "sequential-thinking",
    title: "Sequential Thinking",
    author: "anthropic",
    isVerified: true,
    rating: "80.5k",
    desc: "Break down complex problems with Sequential Thinking, a structured tool and step by step math...",
    tags: ["Official", "Remote", "Popular"],
    views: "8.7k",
    downloads: "795",
    logo: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M7 7h10v10H7z" />
      </svg>
    ),
  },
  {
    id: "duckduckgo",
    title: "DuckDuckGo",
    author: "zhsama",
    isVerified: false,
    rating: "70",
    desc: "Integrate DuckDuckGo web search into your site with our MCP server, supporting features like Google... custom search and robust query controls.",
    tags: ["Community", "Remote"],
    views: "5.9k",
    downloads: "602",
    logo: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="12" fill="url(#avatarGrad)" />
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3 0-9 1.5-9 4.5V20h18v-1.5c0-3-6-4.5-9-4.5z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "playwright-browser-automation",
    title: "Playwright Browser Automation",
    author: "microsoft",
    isVerified: true,
    rating: "28.4k",
    desc: "Enhance software testing with Playwright MCP: Fast, reliable browser automation, an innovative alternative...",
    tags: ["Official", "Popular"],
    views: "8.0k",
    downloads: "595",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A1F1" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" />
      </svg>
    ),
  },
  {
    id: "hashicorp-terraform",
    title: "HashiCorp Terraform",
    author: "hashicorp",
    isVerified: true,
    viewsTotal: "13.8k",
    desc: "Official HashiCorp Terraform MCP server. Real-time access to provider documentation, module... specifications, and Sentinel policies from the",
    tags: ["Official"],
    views: "13.8k",
    downloads: "490",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
        <path d="M2.5 5.5l9 5.2v10.5l-9-5.2zM21.5 5.5l-9 5.2v10.5l9-5.2zM12 1.5l9 5.2-9 5.2-9-5.2z" opacity="0.85" />
      </svg>
    ),
  },
];

interface InstalledServer {
  id: string;
  title: string;
  author: string;
  isVerified: boolean;
  desc: string;
  stars: string;
  installs: string;
  logo: React.ReactNode;
  tag: string;
}

const INSTALLED_SERVERS: InstalledServer[] = [
  {
    id: "atlassian-jira-confluence",
    title: "Atlassian (Jira & Confluence)",
    author: "atlassian",
    isVerified: true,
    desc: "Atlassian's official remote MCP server. Securely connects Jira and Confluence to Claude, Cursor, or any MCP client. OAuth-backed, production...",
    stars: "16.6k",
    installs: "16",
    tag: "Official",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#0052CC">
        <path d="M11.56 16.27l-4.14-4.14A1 1 0 0 0 6 12.84v6.32a1 1 0 0 0 1.71.7l4.14-4.14a1 1 0 0 0-.29-1.45zM22.29 12.84v-6.32a1 1 0 0 0-1.71-.7l-4.14 4.14a1 1 0 0 0 .29 1.45l4.14 4.14a1 1 0 0 0 1.42-.71z" />
      </svg>
    ),
  },
  {
    id: "context7",
    title: "Context7",
    author: "upstash",
    isVerified: true,
    desc: "Boost your AI code assistant with Context7: inject real-time API documentation from OpenAPI specification sources into your coding workflow.",
    stars: "48.2k",
    installs: "2",
    tag: "Official",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
  },
  {
    id: "sequential-thinking",
    title: "Sequential Thinking",
    author: "anthropic",
    isVerified: true,
    desc: "Break down complex problems with Sequential Thinking, a structured tool and step by step math solver for dynamic, reflective solutions.",
    stars: "80.5k",
    installs: "1",
    tag: "Official",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M7 7h10v10H7z" />
      </svg>
    ),
  },
  {
    id: "duckduckgo",
    title: "DuckDuckGo",
    author: "zhsama",
    isVerified: false,
    desc: "Integrate DuckDuckGo web search into your site with our MCP server, supporting features like Google custom search and robust query controls.",
    stars: "70",
    installs: "1",
    tag: "Community",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <defs>
          <linearGradient id="avatarGradInst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="12" fill="url(#avatarGradInst)" />
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3 0-9 1.5-9 4.5V20h18v-1.5c0-3-6-4.5-9-4.5z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "playwright-browser-automation",
    title: "Playwright Browser Automation",
    author: "microsoft",
    isVerified: true,
    desc: "Enhance software testing with Playwright MCP: Fast, reliable browser automation, an innovative alternative to Selenium software testing tools.",
    stars: "28.4k",
    installs: "22",
    tag: "Official",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A1F1" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" />
      </svg>
    ),
  },
  {
    id: "hashicorp-terraform",
    title: "HashiCorp Terraform",
    author: "hashicorp",
    isVerified: true,
    desc: "Official HashiCorp Terraform MCP server. Real-time access to provider documentation, module specifications, and Sentinel policies from the T...",
    stars: "13.8k",
    installs: "16",
    tag: "Official",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
        <path d="M2.5 5.5l9 5.2v10.5l-9-5.2zM21.5 5.5l-9 5.2v10.5l9-5.2zM12 1.5l9 5.2-9 5.2-9-5.2z" opacity="0.85" />
      </svg>
    ),
  },
];

interface Category {
  name: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { name: "Browser Automation", count: 64 },
  { name: "Databases", count: 142 },
  { name: "Search & Web", count: 188 },
  { name: "File Systems", count: 54 },
  { name: "Developer Tools", count: 925 },
  { name: "Cloud & Infrastructure", count: 91 },
  { name: "AI & Machine Learning", count: 289 },
  { name: "Analytics & Data", count: 247 },
  { name: "Communication", count: 79 },
  { name: "Auth & Security", count: 81 },
  { name: "Productivity", count: 370 },
  { name: "Finance", count: 112 },
  { name: "Design", count: 33 },
  { name: "Package Management", count: 0 },
  { name: "Testing", count: 0 },
  { name: "Other", count: 80 }
];

interface ServerList {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
}

const SERVER_LISTS: ServerList[] = [
  {
    title: "Leaderboard",
    desc: "Top 100 by stars",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#EAB308" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
        <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z"></path>
      </svg>
    )
  },
  {
    title: "Best MCP Servers",
    desc: "Top-rated by the community",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  },
  {
    title: "Awesome MCP Servers",
    desc: "Community-curated picks",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    )
  },
  {
    title: "Free MCP Servers",
    desc: "Open-source and free to use",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    )
  },
  {
    title: "Remote MCP Servers",
    desc: "Cloud-hosted, no local setup",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    )
  }
];

interface Publisher {
  id: string;
  name: string;
  serversCount: number;
  logo: React.ReactNode;
}

const PUBLISHERS: Publisher[] = [
  {
    id: "anthropic",
    name: "anthropic",
    serversCount: 5,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#E05C3D">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    id: "atlassian",
    name: "atlassian",
    serversCount: 4,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#0052CC">
        <path d="M11.56 16.27l-4.14-4.14A1 1 0 0 0 6 12.84v6.32a1 1 0 0 0 1.71.7l4.14-4.14a1 1 0 0 0-.29-1.45zM22.29 12.84v-6.32a1 1 0 0 0-1.71-.7l-4.14 4.14a1 1 0 0 0 .29 1.45l4.14 4.14a1 1 0 0 0 1.42-.71z" />
      </svg>
    )
  },
  {
    id: "microsoft",
    name: "microsoft",
    serversCount: 7,
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
    id: "upstash",
    name: "upstash",
    serversCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    )
  },
  {
    id: "hashicorp",
    name: "hashicorp",
    serversCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
        <path d="M2.5 5.5l9 5.2v10.5l-9-5.2zM21.5 5.5l-9 5.2v10.5l9-5.2zM12 1.5l9 5.2-9 5.2-9-5.2z" opacity="0.85" />
      </svg>
    )
  },
  {
    id: "luminati-io",
    name: "luminati-io",
    serversCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#007FFF">
        <circle cx="12" cy="12" r="8" />
      </svg>
    )
  },
  {
    id: "cyanheads",
    name: "cyanheads",
    serversCount: 14,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect width="24" height="24" rx="12" fill="#2D3748" />
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3 0-9 1.5-9 4.5V20h18v-1.5c0-3-6-4.5-9-4.5z" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: "mem0ai",
    name: "mem0ai",
    serversCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#9F7AEA">
        <rect width="24" height="24" rx="4" />
      </svg>
    )
  },
  {
    id: "replicate",
    name: "replicate",
    serversCount: 2,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "paypal",
    name: "paypal",
    serversCount: 3,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#003087">
        <circle cx="12" cy="12" r="8" />
      </svg>
    )
  },
  {
    id: "e2b-dev",
    name: "e2b-dev",
    serversCount: 1,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#E2E8F0">
        <rect width="24" height="24" rx="4" fill="#0F172A" />
        <path d="M6 18V6h12v12H6z" fill="#E2E8F0" />
      </svg>
    )
  },
  {
    id: "kazuph",
    name: "kazuph",
    serversCount: 8,
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect width="24" height="24" rx="12" fill="#4A5568" />
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3 0-9 1.5-9 4.5V20h18v-1.5c0-3-6-4.5-9-4.5z" fill="#ffffff" />
      </svg>
    )
  }
];

interface CuratedCollection {
  id: string;
  title: string;
  desc: string;
}

const COLLECTIONS: CuratedCollection[] = [
  {
    id: "top-alternatives-to-context7-mcp",
    title: "Top Alternatives to Context7 MCP",
    desc: "If you're exploring alternatives, this comparison will guide you in selecting the ideal MCP for your needs."
  },
  {
    id: "top-mcp-servers-for-seo",
    title: "Top MCP Servers for SEO",
    desc: "MCP servers are transforming how SEO professionals work by connecting AI assistants directly to SEO tools and data sources."
  }
];

interface Integration {
  name: string;
  logo: React.ReactNode;
}

const INTEGRATIONS: Integration[] = [
  {
    name: "Cursor",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
        <path d="M12 2L2 22h20L12 2z" />
      </svg>
    )
  },
  {
    name: "Claude Desktop",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#D97706">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    name: "VS Code",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#007ACC">
        <path d="M23.9 6.5l-3.2-3.1c-.2-.2-.5-.2-.7 0L12 11.3 4 3.4c-.2-.2-.5-.2-.7 0L.1 6.5c-.2.2-.2.5 0 .7l7.7 7.7-7.7 7.7c-.2.2-.2.5 0 .7l3.2 3.1c.2.2.5.2.7 0l8-7.9 8 7.9c.2.2.5.2.7 0l3.2-3.1c.2-.2.2-.5 0-.7L16.3 15l7.7-7.8c.2-.2.2-.5 0-.7z" />
      </svg>
    )
  },
  {
    name: "Claude Code",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#EA580C">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    name: "Windsurf",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#06B6D4">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      </svg>
    )
  },
  {
    name: "Codex",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    )
  },
  {
    name: "Gemini CLI",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="url(#geminiGrad)">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
      </svg>
    )
  },
  {
    name: "ChatGPT",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#10A37F">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    name: "Zed",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#E2E8F0">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 12H7v-2h10v2zm0-4H7V9h10v2z" />
      </svg>
    )
  },
  {
    name: "opencode",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  {
    name: "Cline",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#6366F1">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    name: "Goose",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#EC4899">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  }
];

interface BlogPost {
  id: string;
  date: string;
  title: string;
  desc: string;
  views: string;
  readTime: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "sonnet-4.6",
    date: "Apr 16, 2026",
    title: "Claude Sonnet 4.6 + MCP: What's New for AI Agents in 2026",
    desc: "Claude Sonnet 4.6 MCP integration brings 1M token context windows and enhanced tool calling. Discover what's new for AI agents and how to customize...",
    views: "794",
    readTime: "7 min"
  },
  {
    id: "security-flaw",
    date: "Apr 16, 2026",
    title: "MCP Security Flaw Exposes 200,000 Servers: What You Need to Know (April 2026)",
    desc: "MCP security vulnerability 2026: Ox Security reveals design flaw affecting 200,000+ servers. Learn mitigation steps, CVE details, and best practices...",
    views: "1,553",
    readTime: "7 min"
  },
  {
    id: "datadog-alternatives",
    date: "Apr 11, 2026",
    title: "Top 10 Datadog MCP Server Alternatives for AI Observability in 2026",
    desc: "Discover the best Datadog MCP alternatives for AI observability in 2026. Compare features, installation, and use cases for 10+ open-source monitoring...",
    views: "366",
    readTime: "5 min"
  }
];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [activeInstallServer, setActiveInstallServer] = useState<{
    id: string;
    title: string;
    author: string;
    isVerified: boolean;
    logo: React.ReactNode;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = SERVERS.filter((server) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      server.title.toLowerCase().includes(query) ||
      server.author.toLowerCase().includes(query) ||
      server.desc.toLowerCase().includes(query) ||
      server.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const filteredCategories = CATEGORIES.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return cat.name.toLowerCase().includes(query);
  });

  const filteredPublishers = PUBLISHERS.filter((pub) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return pub.name.toLowerCase().includes(query);
  });

  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasResults =
    filteredServers.length > 0 ||
    filteredCategories.length > 0 ||
    filteredPublishers.length > 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullWord = WORDS[wordIndex];

      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(90); // Typing speed

        if (currentText === fullWord) {
          // Finished typing: pause before deleting
          setTypingSpeed(2500); // 2.5 seconds pause
          setIsDeleting(true);
        }
      } else {
        // Deleting characters
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(40); // Deleting speed is faster

        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          setTypingSpeed(250); // Short pause before typing the next word
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <Header />

      {/* Main Hero & Content */}
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Discover the Best
            <br />
            <span className={styles.gradientText}>{currentText}</span>
            <span className="typewriter-cursor" />
          </h1>

          <p className={styles.subtitle}>
            The largest directory of MCP servers and agent skills. One–click install for Cursor, VS Code, Claude, Codex, and more.
          </p>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search servers, tools, or capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={styles.clearSearchInputBtn}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Stats Pills Grid */}
          <div className={styles.statsGrid}>
            <div className={`${styles.card} ${styles.cardBlue}`}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="var(--icon-color)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                </svg>
              </span>
              <span className={styles.cardVal}>2,002</span>
              <span className={styles.cardLabel}>servers</span>
            </div>

            <div className={`${styles.card} ${styles.cardPurple}`}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="var(--icon-color)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.813 15.904L9 21l-.813-5.096L3.096 15 8.188 14.187 9 9l.813 5.187 5.096.813-5.096.904zM19.071 4.929l-.354 2.217-.353-2.217-2.217-.353 2.217-.354.353-2.217.354 2.217 2.217.354-2.217.353zm-.707 13.435l-.212 1.33-.213-1.33-1.33-.212 1.33-.213.213-1.33.212 1.33 1.33.213-1.33.212z"></path>
                </svg>
              </span>
              <span className={styles.cardVal}>9,232</span>
              <span className={styles.cardLabel}>skills</span>
            </div>

            <div className={`${styles.card} ${styles.cardGreen}`}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="var(--icon-color)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span className={styles.cardVal}>1,653</span>
              <span className={styles.cardLabel}>publishers</span>
            </div>

            <div className={`${styles.card} ${styles.cardOrange}`}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="var(--icon-color)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <span className={styles.cardVal}>12</span>
              <span className={styles.cardLabel}>AI clients</span>
            </div>
          </div>
        </section>

        {!hasSearchQuery ? (
          <>
            {/* Popular Servers Section */}
            <section className={styles.serversSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionTitleIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </span>
                  Popular Servers
                </h2>
                <a href="#" className={styles.viewAllLink}>
                  View all popular servers
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>

              <div className={styles.serverGrid}>
                {SERVERS.map((server) => (
                  <Link key={server.id} href={`/servers/${server.id}`} className={styles.serverCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardHeaderLeft}>
                        <div className={styles.cardLogo}>{server.logo}</div>
                        <div className={styles.cardMeta}>
                          <h3 className={styles.cardTitle}>{server.title}</h3>
                          <div className={styles.cardAuthorRow}>
                            <span className={styles.cardAuthor}>{server.author}</span>
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

                      <div className={styles.cardRating}>
                        {server.rating ? (
                          <>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>{server.rating}</span>
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{server.viewsTotal}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className={styles.cardDesc}>{server.desc}</p>

                    <div className={styles.cardTags}>
                      {server.tags.map((tag) => {
                        if (tag === "Official") {
                          return (
                            <span key={tag} className={`${styles.tag} ${styles.tagOfficial}`}>
                              Official
                            </span>
                          );
                        }
                        if (tag === "Community") {
                          return (
                            <span key={tag} className={`${styles.tag} ${styles.tagCommunity}`}>
                              Community
                            </span>
                          );
                        }
                        if (tag === "Remote") {
                          return (
                            <span key={tag} className={`${styles.tag} ${styles.tagRemote}`}>
                              <span className={styles.tagRemoteIcon}>
                                <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                                </svg>
                              </span>
                              Remote
                            </span>
                          );
                        }
                        if (tag === "Popular") {
                          return (
                            <span key={tag} className={`${styles.tag} ${styles.tagPopular}`}>
                              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              Popular
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardStats}>
                        <div className={styles.statItem}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>{server.views}</span>
                        </div>
                        <div className={styles.statItem}>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          <span>{server.downloads}</span>
                        </div>
                      </div>

                      <button 
                        className={styles.btnInstall}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveInstallServer({
                            id: server.id,
                            title: server.title,
                            author: server.author,
                            isVerified: server.isVerified,
                            logo: server.logo,
                          });
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* Most Installed Section */}
            <section className={styles.installedSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionTitleIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
                  </span>
                  Most Installed
                </h2>
                <a href="#" className={styles.viewAllLink}>
                  View all installed servers
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>

              <div className={styles.installedList}>
                {INSTALLED_SERVERS.map((server) => (
                  <Link key={server.id} href={`/servers/${server.id}`} className={styles.rowItem}>
                    <div className={styles.rowLeft}>
                      <div className={styles.rowLogo}>
                        {server.logo}
                      </div>
                      <div className={styles.rowMeta}>
                        <div className={styles.rowTitleRow}>
                          <h3 className={styles.rowTitle}>{server.title}</h3>
                          {server.isVerified && (
                            <span className={styles.verifiedCheck} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent-blue)', marginLeft: '4px' }} title="Verified publisher">
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </span>
                          )}
                          <span className={styles.rowTag} style={{ marginLeft: '4px' }}>{server.tag}</span>
                        </div>
                        <p className={styles.rowDesc}>{server.desc}</p>
                      </div>
                    </div>

                    <div className={styles.rowRight}>
                      <div className={styles.rowStats}>
                        <div className={styles.rowStatItem} title="Stars">
                          <svg className={styles.rowStatIcon} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>{server.stars}</span>
                        </div>
                        <div className={styles.rowStatItem} title="Installs">
                          <svg className={styles.rowStatIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          <span>{server.installs}</span>
                        </div>
                      </div>

                      <button
                        className={styles.btnInstall}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveInstallServer({
                            id: server.id,
                            title: server.title,
                            author: server.author,
                            isVerified: server.isVerified,
                            logo: server.logo,
                          });
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* Browse by Category Section */}
            <section className={styles.categorySection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Browse by Category</h2>
                <Link href="/categories" className={styles.viewAllLink}>
                  View all categories
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              <div className={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <Link key={cat.name} href={`/category/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className={styles.categoryCard}>
                    <span className={styles.categoryName}>{cat.name}</span>
                    <span className={styles.categoryCount}>{cat.count}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Top MCP Server Lists Section */}
            <section className={styles.listsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Top MCP Server Lists</h2>
              </div>
              <div className={styles.listsGrid}>
                {SERVER_LISTS.map((list) => (
                  <Link key={list.title} href={list.href} className={styles.listCard}>
                    <div className={styles.listIconContainer}>
                      {list.icon}
                    </div>
                    <div className={styles.listMeta}>
                      <h3 className={styles.listCardTitle}>{list.title}</h3>
                      <p className={styles.listCardDesc}>{list.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Top Publishers Section */}
            <section className={styles.publishersSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionTitleIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </span>
                  Top Publishers
                </h2>
                <Link href="/publishers" className={styles.viewAllLink}>
                  View all publishers
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              <div className={styles.publishersGrid}>
                {PUBLISHERS.map((pub) => (
                  <Link key={pub.id} href={`/publisher/${pub.id}`} className={styles.publisherCard}>
                    <div className={styles.publisherLogo}>
                      {pub.logo}
                    </div>
                    <div className={styles.publisherMeta}>
                      <span className={styles.publisherName}>{pub.name}</span>
                      <span className={styles.publisherCount}>{pub.serversCount} {pub.serversCount === 1 ? 'server' : 'servers'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Curated Collections Section */}
            <section className={styles.collectionsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Curated Collections</h2>
                <Link href="/collections" className={styles.viewAllLink}>
                  View all collections
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              <div className={styles.collectionsGrid}>
                {COLLECTIONS.map((col) => (
                  <Link key={col.id} href={`/collection/${col.id}`} className={styles.collectionCard}>
                    <h3 className={styles.collectionTitle}>{col.title}</h3>
                    <p className={styles.collectionDesc}>{col.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className={styles.searchResultsSection}>
            <div className={styles.searchResultsHeaderRow}>
              <h2 className={styles.sectionTitle}>
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <span className={styles.resultsCountBadge}>
                {filteredServers.length + filteredCategories.length + filteredPublishers.length} results
              </span>
            </div>

            {hasResults ? (
              <div className={styles.searchResultsContent}>
                {filteredServers.length > 0 && (
                  <div className={styles.searchResultGroup}>
                    <h3 className={styles.searchGroupTitle}>Servers ({filteredServers.length})</h3>
                    <div className={styles.serverGrid}>
                      {filteredServers.map((server) => (
                        <Link key={server.id} href={`/servers/${server.id}`} className={styles.serverCard}>
                          <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                              <div className={styles.cardLogo}>{server.logo}</div>
                              <div className={styles.cardMeta}>
                                <h3 className={styles.cardTitle}>{server.title}</h3>
                                <div className={styles.cardAuthorRow}>
                                  <span className={styles.cardAuthor}>{server.author}</span>
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

                            <div className={styles.cardRating}>
                              {server.rating ? (
                                <>
                                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                  <span>{server.rating}</span>
                                </>
                              ) : (
                                <>
                                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                  <span>{server.viewsTotal}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <p className={styles.cardDesc}>{server.desc}</p>

                          <div className={styles.cardTags}>
                            {server.tags.map((tag) => {
                              if (tag === "Official") {
                                return (
                                  <span key={tag} className={`${styles.tag} ${styles.tagOfficial}`}>
                                    Official
                                  </span>
                                );
                              }
                              if (tag === "Community") {
                                return (
                                  <span key={tag} className={`${styles.tag} ${styles.tagCommunity}`}>
                                    Community
                                  </span>
                                );
                              }
                              if (tag === "Remote") {
                                return (
                                  <span key={tag} className={`${styles.tag} ${styles.tagRemote}`}>
                                    <span className={styles.tagRemoteIcon}>
                                      <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                                      </svg>
                                    </span>
                                    Remote
                                  </span>
                                );
                              }
                              if (tag === "Popular") {
                                return (
                                  <span key={tag} className={`${styles.tag} ${styles.tagPopular}`}>
                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    Popular
                                  </span>
                                );
                              }
                              return null;
                            })}
                          </div>

                          <div className={styles.cardFooter}>
                            <div className={styles.cardStats}>
                              <div className={styles.statItem}>
                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <span>{server.views}</span>
                              </div>
                              <div className={styles.statItem}>
                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>{server.downloads}</span>
                              </div>
                            </div>

                            <button 
                              className={styles.btnInstall}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveInstallServer({
                                  id: server.id,
                                  title: server.title,
                                  author: server.author,
                                  isVerified: server.isVerified,
                                  logo: server.logo,
                                });
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                  </div>
                )}

                {filteredCategories.length > 0 && (
                  <div className={styles.searchResultGroup}>
                    <h3 className={styles.searchGroupTitle}>Categories ({filteredCategories.length})</h3>
                    <div className={styles.categoryGrid}>
                      {filteredCategories.map((cat) => (
                        <Link key={cat.name} href={`/category/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className={styles.categoryCard}>
                          <span className={styles.categoryName}>{cat.name}</span>
                          <span className={styles.categoryCount}>{cat.count}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredPublishers.length > 0 && (
                  <div className={styles.searchResultGroup}>
                    <h3 className={styles.searchGroupTitle}>Publishers ({filteredPublishers.length})</h3>
                    <div className={styles.publishersGrid}>
                      {filteredPublishers.map((pub) => (
                        <Link key={pub.id} href={`/publisher/${pub.id}`} className={styles.publisherCard}>
                          <div className={styles.publisherLogo}>
                            {pub.logo}
                          </div>
                          <div className={styles.publisherMeta}>
                            <span className={styles.publisherName}>{pub.name}</span>
                            <span className={styles.publisherCount}>{pub.serversCount} {pub.serversCount === 1 ? 'server' : 'servers'}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.noResultsContainer}>
                <div className={styles.noResultsIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
                <h3 className={styles.noResultsTitle}>No results found</h3>
                <p className={styles.noResultsDesc}>
                  We couldn&rsquo;t find any servers, categories, or publishers matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        )}

        {/* Works with Your Favorite AI Tools Section */}
        <section className={styles.integrationsSection}>
          <h2 className={styles.integrationsTitle}>Works with Your Favorite AI Tools</h2>
          <p className={styles.integrationsSubtitle}>Seamless one-click installation for all major AI development environments.</p>
          <div className={styles.integrationsContainer}>
            <div className={styles.integrationsRow}>
              {INTEGRATIONS.slice(0, 8).map((tool) => (
                <div key={tool.name} className={styles.integrationPill}>
                  <span className={styles.integrationIcon}>{tool.logo}</span>
                  <span className={styles.integrationName}>{tool.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.integrationsRow}>
              {INTEGRATIONS.slice(8).map((tool) => (
                <div key={tool.name} className={styles.integrationPill}>
                  <span className={styles.integrationIcon}>{tool.logo}</span>
                  <span className={styles.integrationName}>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.integrationsFooterText}>Plus support for any MCP-compatible AI tool through manual configuration</p>
        </section>

        {/* From the Blog Section */}
        <section className={styles.blogSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionTitleIcon}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              From the Blog
            </h2>
            <Link href="/blog" className={styles.viewAllLink}>
              View all blog posts
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          <div className={styles.blogGrid}>
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className={styles.blogCard}>
                <span className={styles.blogDate}>{post.date}</span>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardDesc}>{post.desc}</p>
                <div className={styles.blogCardFooter}>
                  <div className={styles.blogStat}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{post.views}</span>
                  </div>
                  <div className={styles.blogStat}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

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
