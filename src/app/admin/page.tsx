"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: string;
}

interface User {
  _id: string;
  email: string;
  provider: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "blog" | "users">("dashboard");
  
  // Blog State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Blog Form Fields
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [postReadTime, setPostReadTime] = useState("");

  // Users State
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  // Fetch Data
  const fetchBlogPosts = async () => {
    setIsBlogLoading(true);
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBlogLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsUsersLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    fetchUsers();
  }, []);

  // Handle Blog CRUD
  const handleOpenCreate = () => {
    setEditingPost(null);
    setPostTitle("");
    setPostExcerpt("");
    setPostReadTime("5 min read");
    setShowBlogModal(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostExcerpt(post.excerpt);
    setPostReadTime(post.readTime);
    setShowBlogModal(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postExcerpt) return;

    const postData = {
      title: postTitle,
      excerpt: postExcerpt,
      readTime: postReadTime,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      views: editingPost ? editingPost.views : "0",
    };

    try {
      let res;
      if (editingPost) {
        // Update
        res = await fetch(`/api/blog/${editingPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        // Create
        res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      if (res.ok) {
        setShowBlogModal(false);
        fetchBlogPosts();
      } else {
        alert("Failed to save blog post");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving blog post");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchBlogPosts();
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle User Delete
  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete/deactivate this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className={styles.main}>
        <div className={styles.dashboardLayout}>
          
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Admin Panel</h2>
            <nav className={styles.navMenu}>
              <button
                className={`${styles.navItem} ${activeTab === "dashboard" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                  <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                  <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                  <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                </svg>
                Dashboard
              </button>

              <button
                className={`${styles.navItem} ${activeTab === "blog" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("blog")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Manage Blog
              </button>

              <button
                className={`${styles.navItem} ${activeTab === "users" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                Manage Users
              </button>
            </nav>
          </aside>

          {/* Panel Area */}
          <section className={styles.panelContent}>
            
            {/* TAB: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className={styles.tabContent}>
                <h1 className={styles.panelHeading}>Overview</h1>
                <p className={styles.panelSubheading}>Status metrics and platform insights.</p>

                {/* Metrics Cards Grid */}
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Total Blog Posts</span>
                    <span className={styles.metricValue}>{posts.length}</span>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Signed In Users</span>
                    <span className={styles.metricValue}>{users.length}</span>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>MongoDB Status</span>
                    <span className={`${styles.metricValue} ${styles.statusConnected}`}>Connected</span>
                  </div>
                </div>

                {/* Quick Lists */}
                <div className={styles.dashboardSection}>
                  <h3 className={styles.sectionTitle}>Recent Activity Log</h3>
                  <div className={styles.activityList}>
                    {users.slice(0, 5).map((user) => (
                      <div key={user._id} className={styles.activityItem}>
                        <div className={styles.activityDot}></div>
                        <div className={styles.activityDetails}>
                          <span className={styles.activityUser}>{user.email}</span> signed in via{" "}
                          <span className={styles.activityProvider}>{user.provider}</span>
                          <span className={styles.activityTime}>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className={styles.emptyActivity}>No recent auth activity found.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MANAGE BLOG */}
            {activeTab === "blog" && (
              <div className={styles.tabContent}>
                <div className={styles.panelHeaderRow}>
                  <div>
                    <h1 className={styles.panelHeading}>Blog Manager</h1>
                    <p className={styles.panelSubheading}>Add, edit, or delete dynamic articles.</p>
                  </div>
                  <button onClick={handleOpenCreate} className={styles.btnCreate}>
                    + Create Article
                  </button>
                </div>

                {isBlogLoading ? (
                  <div className={styles.loadingSpinner}>Loading blog posts...</div>
                ) : posts.length === 0 ? (
                  <div className={styles.emptyState}>No blog posts found in the database.</div>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Publish Date</th>
                          <th>Read Time</th>
                          <th>Views</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post._id}>
                            <td className={styles.postTitleCol}>{post.title}</td>
                            <td>{post.date}</td>
                            <td>{post.readTime}</td>
                            <td>{post.views}</td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleOpenEdit(post)} className={styles.btnActionEdit}>
                                Edit
                              </button>
                              <button onClick={() => handleDeletePost(post._id)} className={styles.btnActionDelete}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB: MANAGE USERS */}
            {activeTab === "users" && (
              <div className={styles.tabContent}>
                <h1 className={styles.panelHeading}>User Directory</h1>
                <p className={styles.panelSubheading}>Manage users registered via OAuth social login.</p>

                {isUsersLoading ? (
                  <div className={styles.loadingSpinner}>Loading users list...</div>
                ) : users.length === 0 ? (
                  <div className={styles.emptyState}>No users registered yet.</div>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Email Address</th>
                          <th>Provider</th>
                          <th>Join Date</th>
                          <th>Status</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td className={styles.userEmailCol}>{user.email}</td>
                            <td>
                              <span className={`${styles.providerBadge} ${user.provider === 'google' ? styles.providerGoogle : styles.providerGithub}`}>
                                {user.provider}
                              </span>
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                              <span className={styles.statusActiveBadge}>{user.status}</span>
                            </td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleDeleteUser(user._id)} className={styles.btnActionDelete}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Blog Article Editor Modal */}
      {showBlogModal && (
        <div className={styles.modalOverlay} onClick={() => setShowBlogModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{editingPost ? "Edit Article" : "Create New Article"}</h2>
            
            <form onSubmit={handleSavePost} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter title..."
                  className={styles.modalInput}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Excerpt / Brief Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Brief description of the article..."
                  className={styles.modalTextarea}
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Estimated Read Time</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 min read"
                  className={styles.modalInput}
                  value={postReadTime}
                  onChange={(e) => setPostReadTime(e.target.value)}
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="button" onClick={() => setShowBlogModal(false)} className={styles.btnCancel}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
