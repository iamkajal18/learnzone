
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest,NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY|| "");
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  try {
    const result = await model.generateContent(prompt);
    const questions = result.response.text();
    
    return NextResponse.json({ questions });
  } catch (error) {
   return NextResponse.json({ message: 'Failed to generate' });
  }
}