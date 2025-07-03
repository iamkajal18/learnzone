import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestion = async (role: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a technical interviewer. Ask one technical interview question for the role: ${role}.`,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};
