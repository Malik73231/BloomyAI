import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { messages } = req.body;
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  });
  res.status(200).json({ reply: completion.data.choices[0].message });
}