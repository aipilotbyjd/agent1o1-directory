import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

const INITIAL_POSTS = [
  {
    title: "Telegram MCP Server: Complete Setup Guide (2026)",
    excerpt: "Telegram MCP guide 2026: MTProto auth with TG_APP_ID + TG_API_HASH, all five tools, why tg_send only drafts, install for Claude, Cursor, every client.",
    date: "June 12, 2026",
    readTime: "15 min read",
    views: "173",
  },
  {
    title: "Serena MCP: Semantic Code Tools for Claude (2026 Guide)",
    excerpt: "Serena MCP gives Claude Code LSP-grade tools: find_symbol, replace_symbol_body, 40+ languages. Install via uv/uvx, recipes, dashboard and token...",
    date: "June 12, 2026",
    readTime: "16 min read",
    views: "288",
  },
  {
    title: "MarkItDown MCP: Microsoft's File-to-Markdown Server Guide",
    excerpt: "MarkItDown MCP guide: pip/uvx/Docker installs for Claude, Cursor, VS Code, the convert_to_markdown tool, RAG recipes, and what it won't preserve.",
    date: "June 12, 2026",
    readTime: "15 min read",
    views: "265",
  },
  {
    title: "Bitbucket MCP Server: Setup & PR Workflows (2026 Guide)",
    excerpt: "Bitbucket MCP guide: scoped API token auth, app-password sunset fixes, install for Claude Code, Cursor & Codex, PR review recipes, Atlassian official...",
    date: "June 12, 2026",
    readTime: "16 min read",
    views: "162",
  },
  {
    title: "Google Gemini CLI: Open-Source AI Agent That Lives in Your Terminal",
    excerpt: "Google launches Gemini CLI, an open-source AI agent for terminals with 60 requests/minute free tier, Google Search integration, and MCP support fo...",
    date: "July 1, 2025",
    readTime: "4 min read",
    views: "770",
  },
  {
    title: "Cursor In Browser",
    excerpt: "Cursor Agent is now available on web and mobile devices. Background task execution, cross-platform access, Slack integration, and seamless team...",
    date: "July 1, 2025",
    readTime: "2 min read",
    views: "1,736",
  },
  {
    title: "How One Technology Accidentally Changed the Rules of the Game for All...",
    excerpt: "Discover how Model Context Protocol (MCP) accidentally became a universal plugin system that's revolutionizing app development. Learn why this AI...",
    date: "June 29, 2025",
    readTime: "4 min read",
    views: "606",
  },
  {
    title: "Claude Desktop Extensions (DXT) — Making MCP Servers Actually Usable",
    excerpt: "claude, mcp, dxt, Claude Desktop Extensions",
    date: "June 29, 2025",
    readTime: "4 min read",
    views: "2,558",
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Seed initial posts if DB is empty
    const count = await BlogPost.countDocuments({});
    if (count === 0) {
      await BlogPost.insertMany(INITIAL_POSTS);
    }
    
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newPost = await BlogPost.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
