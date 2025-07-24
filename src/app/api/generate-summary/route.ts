import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { content, title } = await request.json();

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt for summary
   const prompt = `
  Generate a concise summary (8-9 lines) of the following blog post content with the title "${title}":
  ${content}
  
  The summary should:
  - Capture the main ideas and key points
  - Be clear and concise
  - Avoid using direct quotes
  - Maintain a neutral tone
  - Be suitable for a general audience
`;

    // Generate summary
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}