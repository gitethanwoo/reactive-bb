import { openai } from '@ai-sdk/openai';
import { streamText, smoothStream } from 'ai';


export async function POST(req: Request) {
    const body = await req.json();

    const { messages } = body;

    const result = streamText({
      model: openai('o3-mini'),
      system: 'You are a helpful assistant that can answer questions and help with tasks.',
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    });

    return result.toDataStreamResponse();
}