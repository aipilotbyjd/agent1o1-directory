"use client";

import { useState } from "react";
import styles from "./InstallModal.module.css";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverId: string;
  serverName: string;
  author: string;
  isVerified: boolean;
  logo: React.ReactNode;
  logoBg?: string;
}

type ClientTab = "claude-desktop" | "cursor" | "vscode" | "claude-code" | "gemini" | "codex";

export default function InstallModal({
  isOpen,
  onClose,
  serverId,
  serverName,
  author,
  isVerified,
  logo,
  logoBg = "rgba(255, 255, 255, 0.05)"
}: InstallModalProps) {
  const [activeTab, setActiveTab] = useState<ClientTab>("claude-desktop");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pkgName = serverId.includes("atlassian")
    ? "@atlassian/mcp-server"
    : serverId.includes("context7")
    ? "@upstash/mcp-server"
    : serverId.includes("sequential")
    ? "@anthropic/mcp-server-sequential-thinking"
    : serverId.includes("duckduckgo")
    ? "@zhsama/mcp-server-duckduckgo"
    : serverId.includes("playwright")
    ? "@microsoft/mcp-server-playwright"
    : serverId.includes("terraform")
    ? "@hashicorp/mcp-server-terraform"
    : `@community/mcp-server-${serverId}`;

  const getEnvVars = () => {
    if (serverId.includes("atlassian")) {
      return {
        "JIRA_URL": "https://your-domain.atlassian.net",
        "JIRA_EMAIL": "your-email",
        "JIRA_API_TOKEN": "your-token",
        "CONFLUENCE_URL": "https://your-domain.atlassian.net",
        "CONFLUENCE_EMAIL": "your-email",
        "CONFLUENCE_API_TOKEN": "your-token"
      };
    }
    if (serverId.includes("context7")) {
      return {
        "UPSTASH_REDIS_REST_URL": "https://your-database.upstash.io",
        "UPSTASH_REDIS_REST_TOKEN": "your-token"
      };
    }
    return null;
  };

  const generateCode = (): string => {
    const key = serverId.includes("atlassian") ? "atlassian" : serverId;
    const env = getEnvVars();

    switch (activeTab) {
      case "claude-desktop": {
        const config = {
          mcpServers: {
            [key]: {
              command: "npx",
              args: ["-y", pkgName],
              ...(env ? { env } : {})
            }
          }
        };
        return JSON.stringify(config, null, 2);
      }
      case "cursor": {
        const config = {
          mcpServers: {
            [key]: {
              command: "npx",
              args: ["-y", pkgName],
              ...(env ? { env } : {})
            }
          }
        };
        return JSON.stringify(config, null, 2);
      }
      case "vscode": {
        const config = {
          mcp: {
            servers: {
              [key]: {
                command: "npx",
                args: ["-y", pkgName],
                ...(env ? { env } : {})
              }
            }
          }
        };
        return JSON.stringify(config, null, 2);
      }
      case "claude-code": {
        let cmd = `claude mcp add npx -y ${pkgName}`;
        if (env) {
          Object.entries(env).forEach(([k, v]) => {
            cmd += ` --env ${k}=${v}`;
          });
        }
        return cmd;
      }
      case "gemini": {
        const config = {
          mcpServers: {
            [key]: {
              command: "npx",
              args: ["-y", pkgName],
              ...(env ? { env } : {})
            }
          }
        };
        return JSON.stringify(config, null, 2);
      }
      case "codex": {
        const config = {
          mcpServers: {
            [key]: {
              command: "npx",
              args: ["-y", pkgName],
              ...(env ? { env } : {})
            }
          }
        };
        return JSON.stringify(config, null, 2);
      }
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoContainer} style={{ backgroundColor: logoBg }}>
            {logo}
          </div>
          <div className={styles.headerMeta}>
            <h2 className={styles.title}>Install {serverName}</h2>
            <div className={styles.authorRow}>
              <span>{author}</span>
              {isVerified && (
                <span className={styles.verifiedCheck} title="Verified publisher">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Pills */}
        <div className={styles.tabBar}>
          {/* Claude Desktop */}
          <button
            className={`${styles.tabPill} ${activeTab === "claude-desktop" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("claude-desktop")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill={activeTab === "claude-desktop" ? "#d97706" : "currentColor"}>
                <path d="M12 2.5a1.2 1.2 0 0 1 1.2 1.2v4.24l3-3a1.2 1.2 0 1 1 1.7 1.7l-3 3h4.24a1.2 1.2 0 1 1 0 2.4h-4.24l3 3a1.2 1.2 0 1 1-1.7 1.7l-3-3v4.24a1.2 1.2 0 1 1-2.4 0v-4.24l-3 3a1.2 1.2 0 1 1-1.7-1.7l3-3H4.26a1.2 1.2 0 1 1 0-2.4h4.24l-3-3a1.2 1.2 0 1 1 1.7-1.7l3 3V3.7A1.2 1.2 0 0 1 12 2.5z"/>
              </svg>
            </span>
            <span>Claude Desktop</span>
          </button>

          {/* Cursor */}
          <button
            className={`${styles.tabPill} ${activeTab === "cursor" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("cursor")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke={activeTab === "cursor" ? "#000000" : "#ffffff"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                <line x1="12" y1="22" x2="12" y2="12" />
                <line x1="12" y1="12" x2="22" y2="8.5" />
                <line x1="12" y1="12" x2="2" y2="8.5" />
              </svg>
            </span>
            <span>Cursor</span>
          </button>

          {/* VS Code */}
          <button
            className={`${styles.tabPill} ${activeTab === "vscode" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("vscode")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill={activeTab === "vscode" ? "#007acc" : "currentColor"}>
                <path d="M22.8 5.66l-3.92-3.92a.66.66 0 0 0-.94 0L10.74 8.94 4.09 2.29a.66.66 0 0 0-.94 0L.3 5.14a.66.66 0 0 0 0 .94L4.72 12 .3 17.92a.66.66 0 0 0 0 .94l2.85 2.85c.26.26.68.26.94 0l6.65-6.65 7.2 7.2a.66.66 0 0 0 .94 0l3.92-3.92a.66.66 0 0 0 0-.94L19.28 12l3.52-3.52a.66.66 0 0 0 0-.94z" />
              </svg>
            </span>
            <span>VS Code</span>
          </button>

          {/* Claude Code */}
          <button
            className={`${styles.tabPill} ${activeTab === "claude-code" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("claude-code")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill={activeTab === "claude-code" ? "#d97706" : "currentColor"}>
                <path d="M12 2.5a1.2 1.2 0 0 1 1.2 1.2v4.24l3-3a1.2 1.2 0 1 1 1.7 1.7l-3 3h4.24a1.2 1.2 0 1 1 0 2.4h-4.24l3 3a1.2 1.2 0 1 1-1.7 1.7l-3-3v4.24a1.2 1.2 0 1 1-2.4 0v-4.24l-3 3a1.2 1.2 0 1 1-1.7-1.7l3-3H4.26a1.2 1.2 0 1 1 0-2.4h4.24l-3-3a1.2 1.2 0 1 1 1.7-1.7l3 3V3.7A1.2 1.2 0 0 1 12 2.5z"/>
              </svg>
            </span>
            <span>Claude Code</span>
          </button>

          {/* Gemini */}
          <button
            className={`${styles.tabPill} ${activeTab === "gemini" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("gemini")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14">
                <defs>
                  <linearGradient id="geminiGradModal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path d="M12 2c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10 5.5 0 10-4.5 10-10z" fill={activeTab === "gemini" ? "url(#geminiGradModal)" : "currentColor"} />
              </svg>
            </span>
            <span>Gemini</span>
          </button>

          {/* Codex */}
          <button
            className={`${styles.tabPill} ${activeTab === "codex" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("codex")}
          >
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19.7 11.2c-.3-.2-.6-.3-.9-.3.1-.3.1-.6 0-1-.1-.6-.5-1-1.1-1.2h-.4c-.1-.3-.4-.5-.7-.6-.6-.2-1.2 0-1.5.5v-.5c0-.6-.4-1.2-1.1-1.3-.4-.1-.8 0-1.1.2V6.6c0-.7-.5-1.2-1.2-1.3-.6-.1-1.2.2-1.5.7h-.2c-.5-.3-1.1-.3-1.6 0-.5.3-.8.8-.8 1.4v2.7c-.3-.2-.6-.3-.9-.3-.6 0-1.2.4-1.4 1-.1.3-.1.7 0 1h-.4c-.6.1-1 .5-1.2 1.1-.1.4 0 .8.2 1.1h-.9c-.6.3-.9.9-.8 1.5 0 .5.3.9.7 1.1v.5c0 .6.4 1.2 1.1 1.3.4.1.8 0 1.1-.2v.4c0 .7.5 1.2 1.2 1.3.6.1 1.2-.2 1.5-.7h.2c.5.3 1.1.3 1.6 0 .5-.3.8-.8.8-1.4v-2.7c.3.2.6.3.9.3.6 0 1.2-.4 1.4-1 .1-.3.1-.7 0-1h.4c.6-.1 1-.5 1.2-1.1.1-.4 0-.8-.2-1.1h.9c.6-.3.9-.9.8-1.5 0-.5-.3-.9-.7-1.1z" />
              </svg>
            </span>
            <span>Codex</span>
          </button>
        </div>

        {/* Code Content Container */}
        <div className={styles.codeContainer}>
          <button className={styles.copyButton} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre className={styles.codeBlock}>
            <code>{generateCode()}</code>
          </pre>
        </div>

        {/* Requirements */}
        <div className={styles.reqsNote}>
          Requires Node.js 18+
        </div>
      </div>
    </div>
  );
}
