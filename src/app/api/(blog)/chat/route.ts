// app/api/chat/route.ts (unchanged—already handles errors well)
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY env var is missing');
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chatSession = model.startChat({
      history: history || [],
    });

    const result = await chatSession.sendMessage(message);
    const responseText = await result.response.text();

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Full Gemini Error:', {
      name: error.name,
      message: error.message,
      status: error.status,
      details: error.details,
      causes: error.causes,
    });
    let errorMsg = 'Internal server error';
    if (error.name === 'GoogleGenerativeAIError' && error.status === 400) {
      errorMsg = 'Invalid API key. Regenerate at aistudio.google.com.';
    } else if (error.message?.includes('quota') || error.status === 429) {
      errorMsg = 'API quota exceeded. Wait 1 minute or add billing for higher limits.';
    } else if (error.message?.includes('not found') || error.status === 404 || error.status === 410) {
      errorMsg = 'Model not available. Update to a current model like gemini-2.0-flash.';
    }
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}