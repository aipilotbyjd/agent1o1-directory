"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className={styles.main}>
        {/* Title Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <h1 className={styles.title}>Blog</h1>
          </div>
          <p className={styles.subtitle}>
            News, deep dives, and server roundups from the MCP ecosystem.
          </p>
        </div>

        {isLoading ? (
          <div className={styles.loadingSpinner}>Loading blog posts...</div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyState}>No blog posts found. Check back later!</div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost._id || featuredPost.id}`} className={styles.featuredCard}>
                <div className={styles.featuredHeader}>
                  <span className={styles.badge}>
                    <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Latest</span>
                  </span>
                  <span className={styles.featuredDate}>{featuredPost.date}</span>
                </div>

                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{featuredPost.views} views</span>
                  </div>
                  <div className={styles.statItem}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Blog Posts Grid */}
            <div className={styles.grid}>
              {secondaryPosts.map((post) => (
                <Link key={post._id || post.id} href={`/blog/${post._id || post.id}`} className={styles.card}>
                  <div className={styles.cardMeta}>
                    <span>{post.date}</span>
                    <span className={styles.cardMetaSeparator}>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{post.views} views</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

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
