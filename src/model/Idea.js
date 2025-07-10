import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    authorEmail: {
      type: String,
    },
    createdBy: {
      type: String, // Stores NextAuth session.user.id
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: ["html", "markdown"],
      default: "html",
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Lifestyle", "Education", "Health", "Data Science", "Java", "Python", "Other"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

ideaSchema.index({ createdBy: 1 }); // Index for faster queries by createdBy

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideaSchema);

export default Idea;