import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  imageUrl: String,
  authorName: String,
  authorEmail: { type: String, required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

blogSchema.index({ authorEmail: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;