import mongoose, { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    views: { type: String, required: true, default: "0" },
  },
  { timestamps: true }
);

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export default BlogPost;
