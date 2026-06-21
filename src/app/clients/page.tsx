"use client";

import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

interface ClientItem {
  id: string;
  name: string;
  description: string;
  path: string;
  logo: React.ReactNode;
  logoBg?: string;
}

const CLIENTS: ClientItem[] = [
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor with built-in MCP support for tool use in chat and agent mode.",
    path: "~/.cursor/mcp.json",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <line x1="12" y1="22" x2="12" y2="12" />
        <line x1="12" y1="12" x2="22" y2="8.5" />
        <line x1="12" y1="12" x2="2" y2="8.5" />
      </svg>
    ),
    logoBg: "rgba(255, 255, 255, 0.06)",
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    description: "Anthropic's desktop app with native MCP integration for connecting Claude to local tools.",
    path: "~/Library/Application Support/Claude/claude_desktop_config.json",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
        <path d="M12 2.5a1.2 1.2 0 0 1 1.2 1.2v4.24l3-3a1.2 1.2 0 1 1 1.7 1.7l-3 3h4.24a1.2 1.2 0 1 1 0 2.4h-4.24l3 3a1.2 1.2 0 1 1-1.7 1.7l-3-3v4.24a1.2 1.2 0 1 1-2.4 0v-4.24l-3 3a1.2 1.2 0 1 1-1.7-1.7l3-3H4.26a1.2 1.2 0 1 1 0-2.4h4.24l-3-3a1.2 1.2 0 1 1 1.7-1.7l3 3V3.7A1.2 1.2 0 0 1 12 2.5z"/>
      </svg>
    ),
    logoBg: "#d97706",
  },
  {
    id: "vs-code",
    name: "VS Code",
    description: "GitHub Copilot in VS Code supports MCP servers via .vscode/mcp.json (workspace) or the user-profile mcp.json. Top-level JSON key is 'servers'.",
    path: ".vscode/mcp.json",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#007acc">
        <path d="M22.8 5.66l-3.92-3.92a.66.66 0 0 0-.94 0L10.74 8.94 4.09 2.29a.66.66 0 0 0-.94 0L.3 5.14a.66.66 0 0 0 0 .94L4.72 12 .3 17.92a.66.66 0 0 0 0 .94l2.85 2.85c.26.26.68.26.94 0l6.65-6.65 7.2 7.2a.66.66 0 0 0 .94 0l3.92-3.92a.66.66 0 0 0 0-.94L19.28 12l3.52-3.52a.66.66 0 0 0 0-.94zM16.92 12l-4.59-4.59.88-.88L17.8 11.12z" />
      </svg>
    ),
    logoBg: "rgba(0, 122, 204, 0.15)",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's CLI coding agent. Add MCP servers via 'claude mcp add --scope project|user|local'. Project-scoped servers write to .mcp.json at the project root; user/local-scoped servers write to ~/.claude.json.",
    path: ".mcp.json",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
        <path d="M12 2.5a1.2 1.2 0 0 1 1.2 1.2v4.24l3-3a1.2 1.2 0 1 1 1.7 1.7l-3 3h4.24a1.2 1.2 0 1 1 0 2.4h-4.24l3 3a1.2 1.2 0 1 1-1.7 1.7l-3-3v4.24a1.2 1.2 0 1 1-2.4 0v-4.24l-3 3a1.2 1.2 0 1 1-1.7-1.7l3-3H4.26a1.2 1.2 0 1 1 0-2.4h4.24l-3-3a1.2 1.2 0 1 1 1.7-1.7l3 3V3.7A1.2 1.2 0 0 1 12 2.5z"/>
      </svg>
    ),
    logoBg: "#d97706",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Codeium's AI IDE with Cascade agent supporting MCP server connections.",
    path: "~/.codeium/windsurf/mcp_config.json",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V7M12 7v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V7" />
      </svg>
    ),
    logoBg: "rgba(255, 255, 255, 0.06)",
  },
  {
    id: "codex",
    name: "Codex",
    description: "OpenAI's coding agent (CLI, IDE, Cloud) with MCP server support — all surfaces share ~/.codex/config.toml.",
    path: "~/.codex/config.toml",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
        <path d="M19.7 11.2c-.3-.2-.6-.3-.9-.3.1-.3.1-.6 0-1-.1-.6-.5-1-1.1-1.2h-.4c-.1-.3-.4-.5-.7-.6-.6-.2-1.2 0-1.5.5v-.5c0-.6-.4-1.2-1.1-1.3-.4-.1-.8 0-1.1.2V6.6c0-.7-.5-1.2-1.2-1.3-.6-.1-1.2.2-1.5.7h-.2c-.5-.3-1.1-.3-1.6 0-.5.3-.8.8-.8 1.4v2.7c-.3-.2-.6-.3-.9-.3-.6 0-1.2.4-1.4 1-.1.3-.1.7 0 1h-.4c-.6.1-1 .5-1.2 1.1-.1.4 0 .8.2 1.1h-.9c-.6.3-.9.9-.8 1.5 0 .5.3.9.7 1.1v.5c0 .6.4 1.2 1.1 1.3.4.1.8 0 1.1-.2v.4c0 .7.5 1.2 1.2 1.3.6.1 1.2-.2 1.5-.7h.2c.5.3 1.1.3 1.6 0 .5-.3.8-.8.8-1.4v-2.7c.3.2.6.3.9.3.6 0 1.2-.4 1.4-1 .1-.3.1-.7 0-1h.4c.6-.1 1-.5 1.2-1.1.1-.4 0-.8-.2-1.1h.9c.6-.3.9-.9.8-1.5 0-.5-.3-.9-.7-1.1z" />
      </svg>
    ),
    logoBg: "rgba(255, 255, 255, 0.06)",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    description: "Google's CLI for Gemini models with MCP server integration.",
    path: "~/.gemini/settings.json",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d="M12 2c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10 5.5 0 10-4.5 10-10z" fill="url(#geminiGrad)" />
      </svg>
    ),
    logoBg: "rgba(59, 130, 246, 0.1)",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's ChatGPT supports remote MCP servers via the Connectors feature.",
    path: "Settings > Connectors",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
        <path d="M19.7 11.2c-.3-.2-.6-.3-.9-.3.1-.3.1-.6 0-1-.1-.6-.5-1-1.1-1.2h-.4c-.1-.3-.4-.5-.7-.6-.6-.2-1.2 0-1.5.5v-.5c0-.6-.4-1.2-1.1-1.3-.4-.1-.8 0-1.1.2V6.6c0-.7-.5-1.2-1.2-1.3-.6-.1-1.2.2-1.5.7h-.2c-.5-.3-1.1-.3-1.6 0-.5.3-.8.8-.8 1.4v2.7c-.3-.2-.6-.3-.9-.3-.6 0-1.2.4-1.4 1-.1.3-.1.7 0 1h-.4c-.6.1-1 .5-1.2 1.1-.1.4 0 .8.2 1.1h-.9c-.6.3-.9.9-.8 1.5 0 .5.3.9.7 1.1v.5c0 .6.4 1.2 1.1 1.3.4.1.8 0 1.1-.2v.4c0 .7.5 1.2 1.2 1.3.6.1 1.2-.2 1.5-.7h.2c.5.3 1.1.3 1.6 0 .5-.3.8-.8.8-1.4v-2.7c.3.2.6.3.9.3.6 0 1.2-.4 1.4-1 .1-.3.1-.7 0-1h.4c.6-.1 1-.5 1.2-1.1.1-.4 0-.8-.2-1.1h.9c.6-.3.9-.9.8-1.5 0-.5-.3-.9-.7-1.1z" />
      </svg>
    ),
    logoBg: "rgba(255, 255, 255, 0.06)",
  },
  {
    id: "zed",
    name: "Zed",
    description: "High-performance code editor with native MCP support in the assistant panel.",
    path: "~/.config/zed/settings.json",
    logo: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5h14L5 19h14" />
      </svg>
    ),
    logoBg: "rgba(255, 255, 255, 0.06)",
  }
];

export default function ClientsPage() {
  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>MCP Clients</h1>
          <p className={styles.subtitle}>
            Every MCP-compatible client with setup guides and configuration docs.
          </p>
        </div>

        {/* Clients Grid */}
        <div className={styles.grid}>
          {CLIENTS.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.logoContainer} style={{ backgroundColor: client.logoBg }}>
                    {client.logo}
                  </div>
                  <h3 className={styles.cardTitle}>{client.name}</h3>
                </div>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>

              <p className={styles.cardDesc}>{client.description}</p>

              <code className={styles.codeBlock}>
                {client.path}
              </code>
            </Link>
          ))}
        </div>
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
