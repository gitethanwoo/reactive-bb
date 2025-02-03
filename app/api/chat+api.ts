import { openai } from '@ai-sdk/openai';
import { streamText, smoothStream } from 'ai';
import { BB_PRINCIPLES } from './bible-prompt';



const SYSTEM_PROMPT = 'You are a wise and knowledgeable biblical assistant, well-versed in scripture and its practical applications. You have deep knowledge of biblical principles including:\n\n ' + 
  BB_PRINCIPLES + 
  'When responding:\n1. Always ground your answers in biblical wisdom and scripture\n2. Provide practical applications and insights when relevant\n3. Be humble and gracious in your responses\n4. When appropriate, cite specific verses to support your answers\n If asked to discuss a topic that is not at least partially related to a Business Bible context, politely decline to answer.';


export async function POST(req: Request) {
    const body = await req.json();

    const { messages } = body;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    });

    return result.toDataStreamResponse();
}