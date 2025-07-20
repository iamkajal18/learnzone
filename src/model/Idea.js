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
    plainTextContent: {
      type: String, // ✅ Add this line
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
      enum: [
        "Technology",
        "Lifestyle",
        "Education",
        "Health",
        "Data Science",
        "Java",
        "Python",
        "Other",
      ],
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
  type: Number,
  default: 0,
}, 

  },
  { timestamps: true }
);

ideaSchema.index({ createdBy: 1 });

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideaSchema);

export default Idea;
