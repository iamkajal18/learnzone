import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { question, answer } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert technical interviewer. Give honest feedback on the candidate’s answer. Include strengths, weaknesses, and give a score out of 10.',
        },
        {
          role: 'user',
          content: `Question: ${question}\nAnswer: ${answer}`,
        },
      ],
      temperature: 0.7,
    });

    const feedback = response.choices[0].message.content;
    return Response.json({ success: true, feedback });
  } catch (error) {
    console.error('❌ Feedback generation failed:', error);
    return Response.json({ success: false, error });
  }
}
