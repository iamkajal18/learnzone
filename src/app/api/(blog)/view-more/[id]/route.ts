import connectDB from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";
import Idea from "@/model/Idea";
import mongoose from "mongoose";

// Define the response shape for type safety
interface ApiResponse<T> {
  success: boolean;
  message: string;
  idea?: T;
  error?: string;
}

// Define the expected Idea shape for the response
interface IdeaResponse {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  authorEmail?: string;
}

// List of valid tags from the provided document
const VALID_TAGS = [
  "concept", "notion", "thought", "opinion", "view", "perspective", "belief", "suggestion", "proposal",
  "hypothesis", "theory", "insight", "inspiration", "creativity", "imagination", "innovation", "brainstorm",
  "hunch", "intuition", "vision", "plan", "scheme", "design", "draft", "outline", "sketch", "framework",
  "structure", "model", "pattern", "system", "approach", "method", "technique", "strategy", "tactic",
  "process", "procedure", "execution", "implementation", "realization", "development", "evolution",
  "progress", "advancement", "growth", "expansion", "enhancement", "improvement", "modification",
  "adjustment", "revision", "edit", "update", "amendment", "correction", "refinement", "polish",
  "completion", "finish", "conclusion", "result", "outcome", "effect", "impact", "influence",
  "inspiration", "motivation", "encouragement", "stimulus", "trigger", "spark", "cue", "hint", "clue",
  "lead", "trace", "evidence", "proof", "confirmation", "validation", "verification", "authentication",
  "authorization", "approval", "acceptance", "endorsement", "support", "backing", "reinforcement",
  "strengthening", "fortification", "consolidation", "unification", "integration", "combination",
  "fusion", "blend", "mixture", "alloy", "compound", "composite", "aggregate", "collection", "assembly",
  "gathering", "accumulation", "pile", "stack", "heap", "mass", "bulk", "quantity", "volume", "amount",
  "measure", "extent", "degree", "level", "stage", "phase", "step", "milestone", "marker", "indicator",
  "sign", "symbol", "representation", "depiction", "portrayal", "illustration", "demonstration",
  "exhibition", "presentation", "display", "show", "exhibit", "exposure", "revelation", "disclosure",
  "unveiling", "discovery", "finding", "detection", "recognition", "identification", "acknowledgment",
  "notice", "observation", "remark", "comment", "note", "annotation", "footnote", "explanation",
  "clarification", "interpretation", "construction", "understanding", "comprehension", "grasp",
  "perception", "cognition", "awareness", "knowledge", "wisdom", "learning", "education", "instruction",
  "teaching", "guidance", "direction", "leadership", "management", "supervision", "oversight",
  "control", "regulation", "governance", "administration", "organization", "coordination", "arrangement",
  "alignment", "harmony", "balance", "symmetry", "proportion", "ratio", "relation", "connection",
  "link", "association", "relationship", "bond", "tie", "attachment", "affiliation", "alliance",
  "partnership", "cooperation", "collaboration", "teamwork", "unity", "solidarity", "fellowship",
  "companionship", "friendship", "coalition", "union", "merger", "junction", "intersection", "crossing",
  "meeting", "encounter", "contact", "interaction", "engagement", "involvement", "participation",
  "contribution", "input", "addition", "inclusion", "incorporation", "embodiment", "personification",
  "incarnation", "manifestation", "expression", "communication", "conveyance", "transmission",
  "delivery", "transfer", "sharing", "distribution", "dissemination", "spread", "propagation",
  "circulation", "diffusion", "dispersal", "scattering", "dispersion", "expansion", "extension",
  "outreach", "reach", "scope", "range",
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Invalid blog post ID",
        error: "The provided ID is not a valid MongoDB ObjectId",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const idea = await Idea.findById(id).lean() as (typeof Idea) & {
      _id: mongoose.Types.ObjectId;
      title?: string;
      content?: string;
      imageUrl?: string;
      contentType?: string;
      createdAt?: Date | string;
      updatedAt?: Date | string;
      author?: string;
      profilePhoto?: string;
      category?: string;
      tags?: string[];
      authorEmail?: string;
    } | null;

    if (!idea) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Blog post not found",
          error: "No blog post found with the provided ID",
        },
        { status: 404 }
      );
    }

    // Validate and filter tags against VALID_TAGS
    const filteredTags = Array.isArray(idea.tags)
      ? idea.tags.filter((tag: string) => VALID_TAGS.includes(tag.toLowerCase()))
      : [];

    // Transform the idea to match the expected frontend structure
    const ideaResponse: IdeaResponse = {
      id: idea._id.toString(),
      title: idea.title || "Untitled",
      content: idea.content || "",
      imageUrl: idea.imageUrl || undefined,
      contentType: idea.contentType || "html",
      createdAt: idea.createdAt ? new Date(idea.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: idea.updatedAt ? new Date(idea.updatedAt).toISOString() : new Date().toISOString(),
      author: {
        name: idea.author || "Anonymous",
        avatar: idea.profilePhoto || undefined,
      },
      category: idea.category || "Other",
      tags: filteredTags,
      authorEmail: idea.authorEmail || undefined,
    };

    return NextResponse.json<ApiResponse<IdeaResponse>>(
      {
        success: true,
        message: "Blog post retrieved successfully",
        idea: ideaResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to retrieve blog post",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}