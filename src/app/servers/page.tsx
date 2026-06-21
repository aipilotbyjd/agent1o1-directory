"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import InstallModal from "@/components/InstallModal";
import styles from "./page.module.css";

// Interface for MCP Server
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
  category: string;
  type: "Official" | "Community";
  transport: "Local (stdio)" | "Remote (HTTP)";
  language: "TypeScript" | "Python" | "Go" | "Rust";
  starsValue: number;      // raw rating/stars count for sorting
  downloadsValue: number;  // raw downloads count for sorting
  updatedAt: number;       // timestamp for sorting
  createdAt: number;       // timestamp for sorting
}

// Initial Servers Data (6 primary servers from home page + 6 additional for "Load More")
const INITIAL_SERVERS: Server[] = [
  {
    id: "atlassian-jira-confluence",
    title: "Atlassian (Jira & Confluence)",
    author: "atlassian",
    isVerified: true,
    viewsTotal: "16.6k",
    desc: "Atlassian's official remote MCP server. Securely connects Jira and Confluence to Claude, Cursor, or any MCP client.",
    tags: ["Official"],
    views: "16.6k",
    downloads: "898",
    category: "Auth Security",
    type: "Official",
    transport: "Local (stdio)",
    language: "TypeScript",
    starsValue: 15400,
    downloadsValue: 898,
    updatedAt: 1718726400000, // recent
    createdAt: 1716048000000,
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
    desc: "Boost your AI code assistant with Context7: inject real-time API documentation from OpenAPI schemas directly into your context.",
    tags: ["Official", "Remote", "Popular"],
    views: "17.1k",
    downloads: "813",
    category: "API Documentation",
    type: "Official",
    transport: "Remote (HTTP)",
    language: "TypeScript",
    starsValue: 48200,
    downloadsValue: 813,
    updatedAt: 1718640000000,
    createdAt: 1715961600000,
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
    desc: "Break down complex problems with Sequential Thinking, a structured reasoning tool that executes step-by-step thinking patterns.",
    tags: ["Official", "Remote", "Popular"],
    views: "8.8k",
    downloads: "795",
    category: "Reasoning",
    type: "Official",
    transport: "Remote (HTTP)",
    language: "Python",
    starsValue: 80500,
    downloadsValue: 795,
    updatedAt: 1718812800000, // most recent
    createdAt: 1716134400000,
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
    desc: "Integrate DuckDuckGo web search into your workspace. Access instant search results, snippets, and answers.",
    tags: ["Community", "Remote"],
    views: "6.0k",
    downloads: "602",
    category: "Web Search",
    type: "Community",
    transport: "Remote (HTTP)",
    language: "Go",
    starsValue: 70,
    downloadsValue: 602,
    updatedAt: 1718467200000,
    createdAt: 1715788800000,
    logo: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <defs>
          <linearGradient id="ddgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="12" fill="url(#ddgGrad)" />
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
    desc: "Enhance software testing with Playwright MCP: Fast, reliable browser automation for test cases and visual checking.",
    tags: ["Official", "Popular"],
    views: "8.1k",
    downloads: "595",
    category: "Testing",
    type: "Official",
    transport: "Local (stdio)",
    language: "TypeScript",
    starsValue: 28400,
    downloadsValue: 595,
    updatedAt: 1718553600000,
    createdAt: 1715875200000,
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
    desc: "Official HashiCorp Terraform MCP server. Real-time access to provider documentation, module specifications, and Sentinel policies.",
    tags: ["Official"],
    views: "13.8k",
    downloads: "490",
    category: "DevOps",
    type: "Official",
    transport: "Local (stdio)",
    language: "Go",
    starsValue: 8400,
    downloadsValue: 490,
    updatedAt: 1718380800000,
    createdAt: 1715702400000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
        <path d="M2.5 5.5l9 5.2v10.5l-9-5.2zM21.5 5.5l-9 5.2v10.5l9-5.2zM12 1.5l9 5.2-9 5.2-9-5.2z" opacity="0.85" />
      </svg>
    ),
  },
  // Additional mock servers (loaded on "Load More")
  {
    id: "sqlite-database",
    title: "SQLite Database",
    author: "sqlite-community",
    isVerified: false,
    rating: "3.4k",
    desc: "A local SQLite database adapter allowing your AI agent to query, edit, and explore SQLite database files directly.",
    tags: ["Community"],
    views: "5.4k",
    downloads: "450",
    category: "Databases",
    type: "Community",
    transport: "Local (stdio)",
    language: "TypeScript",
    starsValue: 3400,
    downloadsValue: 450,
    updatedAt: 1718294400000,
    createdAt: 1715616000000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    id: "brave-search",
    title: "Brave Search API",
    author: "brave",
    isVerified: true,
    rating: "15.1k",
    desc: "Brave Search integration. Fetch organic web search results, text snippets, and local details in real-time.",
    tags: ["Official", "Remote"],
    views: "12.0k",
    downloads: "410",
    category: "Web Search",
    type: "Official",
    transport: "Remote (HTTP)",
    language: "Rust",
    starsValue: 15100,
    downloadsValue: 410,
    updatedAt: 1718208000000,
    createdAt: 1715529600000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF5E00">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h-2v-2h6v2h-2v2z" />
      </svg>
    ),
  },
  {
    id: "memory-graph",
    title: "Knowledge Memory Graph",
    author: "anthropic",
    isVerified: true,
    rating: "33.5k",
    desc: "Anthropic's memory helper. Save and organize abstract graph concepts, notes, and relationship links inside a local memory pool.",
    tags: ["Official", "Popular"],
    views: "9.2k",
    downloads: "385",
    category: "Reasoning",
    type: "Official",
    transport: "Local (stdio)",
    language: "Python",
    starsValue: 33500,
    downloadsValue: 385,
    updatedAt: 1718121600000,
    createdAt: 1715443200000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="2.5">
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
    ),
  },
  {
    id: "docker-manager",
    title: "Docker Manager Client",
    author: "containers-mcp",
    isVerified: false,
    rating: "180",
    desc: "Control local Docker containers: start, stop, restart, list running containers, and view logs via simple tool parameters.",
    tags: ["Community"],
    views: "3.2k",
    downloads: "290",
    category: "DevOps",
    type: "Community",
    transport: "Local (stdio)",
    language: "Go",
    starsValue: 180,
    downloadsValue: 290,
    updatedAt: 1718035200000,
    createdAt: 1715356800000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#2496ED">
        <path d="M13.9 10.9h-2.4V8.5h2.4v2.4zm0-2.8h-2.4V5.7h2.4v2.4zM11.1 10.9H8.7V8.5h2.4v2.4zm0-2.8H8.7V5.7h2.4v2.4zM8.3 10.9H5.9V8.5h2.4v2.4zm5.6 5.6h-2.4v-2.4h2.4v2.4zm-2.8 0H8.7v-2.4h2.4v2.4zm-2.8 0H5.9v-2.4h2.4v2.4zm8.4-5.6h-2.4V8.5h2.4v2.4z" />
      </svg>
    ),
  },
  {
    id: "slack-bot-mcp",
    title: "Slack Bot Adapter",
    author: "slack-hq",
    isVerified: true,
    rating: "12.8k",
    desc: "Post messages, read channels, and manage webhooks inside Slack workspace channels securely using OAuth.",
    tags: ["Official", "Remote"],
    views: "11.5k",
    downloads: "285",
    category: "Communication",
    type: "Official",
    transport: "Remote (HTTP)",
    language: "Python",
    starsValue: 12800,
    downloadsValue: 285,
    updatedAt: 1717948800000,
    createdAt: 1715270400000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M5.04 15.12a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zM6.3 15.12a2.52 2.52 0 0 1 5.04 0v5.04H6.3v-5.04z" fill="#36C5F0" />
        <path d="M8.88 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H8.88zM8.88 6.3a2.52 2.52 0 0 1 0 5.04H3.84V6.3H8.88z" fill="#2EB67D" />
        <path d="M18.96 8.88a2.52 2.52 0 1 1 2.52 2.52h-2.52V8.88zM17.7 8.88a2.52 2.52 0 0 1-5.04 0V3.84h5.04v5.04z" fill="#ECB22E" />
        <path d="M15.12 18.96a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52zM15.12 17.7a2.52 2.52 0 0 1 0-5.04h5.04v5.04h-5.04z" fill="#E01E5A" />
      </svg>
    ),
  },
  {
    id: "github-connector",
    title: "GitHub Tools Connector",
    author: "github",
    isVerified: true,
    rating: "72.4k",
    desc: "Direct GitHub API integration: manage issues, review pull requests, create repositories, and search codebase files.",
    tags: ["Official", "Popular"],
    views: "24.6k",
    downloads: "1280",
    category: "DevOps",
    type: "Official",
    transport: "Remote (HTTP)",
    language: "TypeScript",
    starsValue: 72400,
    downloadsValue: 1280,
    updatedAt: 1718726400000,
    createdAt: 1716048000000,
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  }
];

// Dropdown filter lists
const CATEGORIES = [
  "All Categories",
  "Auth Security",
  "API Documentation",
  "Reasoning",
  "Web Search",
  "Testing",
  "DevOps",
  "Databases",
  "Communication"
];

const TYPES = ["All Types", "Official", "Community"];
const TRANSPORTS = ["All Transports", "Local (stdio)", "Remote (HTTP)"];
const LANGUAGES = ["All Languages", "TypeScript", "Python", "Go", "Rust"];

// Popular servers list (from screenshot 2)
const POPULAR_SERVERS_LIST = [
  "Markitdown", "Browser Use", "GitHub", "Serena", "Google GenAI Toolbox", "MCP Use", "HexStrike AI", "Desktop Commander", "JsonDiffPatch", "Deep Research MCP",
  "Firecrawl", "Context7", "Task Master", "Beads", "PAL MCP Server", "Arize Phoenix", "MCP Registry", "Genkit", "XcodeBuild", "Magic",
  "Sequential Thinking", "Playwright Browser Automation", "Repomix", "Blender", "Pipedream", "AWS Documentation", "Browser", "Claude Context", "XcodeBuild MCP", "Firebase",
  "Knowledge Graph Memory", "Chrome DevTools MCP", "Mastra Docs", "n8n", "Chrome MCP", "GhidraMCP", "WhatsApp MCP", "Windows MCP", "MCPO (MCP-to-OpenAPI)", "Filesystem",
  "Chrome DevTools", "Oh My Posh", "Figma Context", "Uno Platform", "GitMCP", "Desktop Commander MCP", "Playwright", "Atlassian Cloud", "Notion", "Brave Search"
];

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedTransport, setSelectedTransport] = useState("All Transports");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [activeTab, setActiveTab] = useState("Trending");
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Pagination states
  const [loadedCount, setLoadedCount] = useState(6);
  const [remainingCount, setRemainingCount] = useState(1978);

  // Toast / Feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Install Modal state
  const [activeInstallServer, setActiveInstallServer] = useState<{
    id: string;
    title: string;
    author: string;
    isVerified: boolean;
    logo: React.ReactNode;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelectOption = (filterType: string, value: string) => {
    if (filterType === "category") setSelectedCategory(value);
    if (filterType === "type") setSelectedType(value);
    if (filterType === "transport") setSelectedTransport(value);
    if (filterType === "language") setSelectedLanguage(value);
    setOpenDropdown(null);
  };

  const handleFeedbackClick = () => {
    setToastMessage("Thank you for your feedback! It helps us improve the directory.");
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLoadMore = () => {
    if (loadedCount < INITIAL_SERVERS.length) {
      setLoadedCount(prev => Math.min(prev + 6, INITIAL_SERVERS.length));
      setRemainingCount(prev => Math.max(prev - 6, 0));
      setToastMessage("Mock loaded: additional servers appended.");
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setToastMessage("All mock database servers are already displayed!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // 1. FILTERING
  const filteredServers = INITIAL_SERVERS.filter((server) => {
    // Search Query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchSearch =
        server.title.toLowerCase().includes(query) ||
        server.author.toLowerCase().includes(query) ||
        server.desc.toLowerCase().includes(query) ||
        server.tags.some((t) => t.toLowerCase().includes(query));
      if (!matchSearch) return false;
    }

    // Category
    if (selectedCategory !== "All Categories" && server.category !== selectedCategory) {
      return false;
    }

    // Type
    if (selectedType !== "All Types" && server.type !== selectedType) {
      return false;
    }

    // Transport
    if (selectedTransport !== "All Transports" && server.transport !== selectedTransport) {
      return false;
    }

    // Language
    if (selectedLanguage !== "All Languages" && server.language !== selectedLanguage) {
      return false;
    }

    return true;
  });

  // 2. SORTING
  const sortedServers = [...filteredServers].sort((a, b) => {
    if (activeTab === "Most Stars") {
      return b.starsValue - a.starsValue;
    }
    if (activeTab === "Most Installed") {
      return b.downloadsValue - a.downloadsValue;
    }
    if (activeTab === "Recently Updated") {
      return b.updatedAt - a.updatedAt;
    }
    if (activeTab === "Recently Added") {
      return b.createdAt - a.createdAt;
    }
    // Default / Trending: Sort by downloadsValue + views
    return b.downloadsValue * 2 + b.starsValue - (a.downloadsValue * 2 + a.starsValue);
  });

  // Paginated List
  const displayedServers = sortedServers.slice(0, loadedCount);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Search input section */}
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search 1,800+ MCP servers..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLoadedCount(6); // reset pagination on search
            }}
          />
        </div>

        {/* Filter controls row */}
        <div className={styles.filterBar} ref={dropdownRef}>
          {/* Sorting tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "Trending" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("Trending")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              Trending
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Most Stars" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("Most Stars")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Most Stars
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Recently Updated" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("Recently Updated")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Recently Updated
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Recently Added" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("Recently Added")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Recently Added
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Most Installed" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("Most Installed")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Most Installed
            </button>
          </div>

          {/* Dropdowns filters */}
          <div className={styles.dropdownGroup}>
            {/* Category dropdown */}
            <div className={`${styles.dropdownWrapper} ${openDropdown === "category" ? styles.dropdownOpen : ""}`}>
              <button
                className={`${styles.dropdownSelect} ${selectedCategory !== "All Categories" ? styles.dropdownSelectActive : ""}`}
                onClick={() => toggleDropdown("category")}
              >
                <span>{selectedCategory === "All Categories" ? "Category" : selectedCategory}</span>
                <svg className={styles.dropdownChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openDropdown === "category" && (
                <div className={styles.dropdownMenu}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.dropdownItem} ${selectedCategory === cat ? styles.dropdownItemActive : ""}`}
                      onClick={() => handleSelectOption("category", cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type dropdown */}
            <div className={`${styles.dropdownWrapper} ${openDropdown === "type" ? styles.dropdownOpen : ""}`}>
              <button
                className={`${styles.dropdownSelect} ${selectedType !== "All Types" ? styles.dropdownSelectActive : ""}`}
                onClick={() => toggleDropdown("type")}
              >
                <span>{selectedType === "All Types" ? "Type" : selectedType}</span>
                <svg className={styles.dropdownChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openDropdown === "type" && (
                <div className={styles.dropdownMenu}>
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      className={`${styles.dropdownItem} ${selectedType === t ? styles.dropdownItemActive : ""}`}
                      onClick={() => handleSelectOption("type", t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Transport dropdown */}
            <div className={`${styles.dropdownWrapper} ${openDropdown === "transport" ? styles.dropdownOpen : ""}`}>
              <button
                className={`${styles.dropdownSelect} ${selectedTransport !== "All Transports" ? styles.dropdownSelectActive : ""}`}
                onClick={() => toggleDropdown("transport")}
              >
                <span>{selectedTransport === "All Transports" ? "Transport" : selectedTransport}</span>
                <svg className={styles.dropdownChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openDropdown === "transport" && (
                <div className={styles.dropdownMenu}>
                  {TRANSPORTS.map((tr) => (
                    <button
                      key={tr}
                      className={`${styles.dropdownItem} ${selectedTransport === tr ? styles.dropdownItemActive : ""}`}
                      onClick={() => handleSelectOption("transport", tr)}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language dropdown */}
            <div className={`${styles.dropdownWrapper} ${openDropdown === "language" ? styles.dropdownOpen : ""}`}>
              <button
                className={`${styles.dropdownSelect} ${selectedLanguage !== "All Languages" ? styles.dropdownSelectActive : ""}`}
                onClick={() => toggleDropdown("language")}
              >
                <span>{selectedLanguage === "All Languages" ? "Language" : selectedLanguage}</span>
                <svg className={styles.dropdownChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openDropdown === "language" && (
                <div className={styles.dropdownMenu}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      className={`${styles.dropdownItem} ${selectedLanguage === l ? styles.dropdownItemActive : ""}`}
                      onClick={() => handleSelectOption("language", l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Layout Toggle buttons */}
            <div className={styles.layoutToggle}>
              <button
                className={`${styles.layoutBtn} ${layoutMode === "grid" ? styles.layoutBtnActive : ""}`}
                onClick={() => setLayoutMode("grid")}
                title="Grid layout"
                aria-label="Grid layout"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`${styles.layoutBtn} ${layoutMode === "list" ? styles.layoutBtnActive : ""}`}
                onClick={() => setLayoutMode("list")}
                title="List layout"
                aria-label="List layout"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Server Cards List/Grid Rendering */}
        {displayedServers.length > 0 ? (
          layoutMode === "grid" ? (
            <div className={styles.serverGrid}>
              {displayedServers.map((server) => (
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
          ) : (
            <div className={styles.serverList}>
              {displayedServers.map((server) => (
                <Link key={server.id} href={`/servers/${server.id}`} className={styles.listItem}>
                  <div className={styles.listLeft}>
                    <div className={styles.listLogo}>{server.logo}</div>
                    <div className={styles.listMeta}>
                      <div className={styles.listTitleRow}>
                        <h3 className={styles.listTitle}>{server.title}</h3>
                        <span className={styles.listAuthor}>by {server.author}</span>
                        {server.isVerified && (
                          <span className={styles.verifiedCheck}>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className={styles.listDesc}>{server.desc}</p>
                    </div>
                  </div>

                  <div className={styles.listRight}>
                    <div className={styles.listStats}>
                      <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>{server.rating || server.viewsTotal}</span>
                      </div>
                      <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>{server.downloads} downloads</span>
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
          )
        ) : (
          <div className={styles.noResults}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4 className={styles.noResultsTitle}>No servers found</h4>
            <p className={styles.noResultsText}>
              We couldn't find any MCP servers matching "{searchQuery}" with the current filters.
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className={styles.loadMoreContainer}>
          <button className={styles.btnLoadMore} onClick={handleLoadMore}>
            Load more ({remainingCount} remaining)
          </button>
        </div>

        {/* About MCP Servers Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>About MCP Servers</h2>
          <div className={styles.aboutText}>
            <p>
              <strong>MCP (Model Context Protocol)</strong> servers extend AI coding assistants with new capabilities.
              Each server provides tools, resources, and prompts that AI agents can use to interact with external
              services — databases, APIs, browsers, file systems, and more.
            </p>
            <p>
              Install any server with one click for <strong>Cursor, Claude Desktop, VS Code</strong>, Claude Code, and other
              MCP-compatible AI clients. Browse by <strong>category</strong>, compare alternatives, and find the right server for your workflow.
            </p>
          </div>
        </section>

        {/* Popular MCP Servers Section */}
        <section className={styles.popularSection}>
          <h2 className={styles.popularTitle}>Popular MCP Servers</h2>
          <div className={styles.popularGrid}>
            {POPULAR_SERVERS_LIST.map((srv, idx) => (
              <Link
                key={`${srv}-${idx}`}
                href={`/servers?q=${encodeURIComponent(srv.toLowerCase())}`}
                className={styles.popularLink}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchQuery(srv);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {srv}
              </Link>
            ))}
          </div>
        </section>
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
