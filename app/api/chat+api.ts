import { openai } from '@ai-sdk/openai';
import { streamText, smoothStream } from 'ai';
import Constants from 'expo-constants';

// Get the API key from Expo constants
const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey;

if (!OPENAI_API_KEY) {
  console.error('[API] OpenAI API key is not configured');
}

// Configure OpenAI globally
process.env.OPENAI_API_KEY = OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    console.log('[API] Chat request received');
    
    const body = await req.json();
    console.log('[API] Request body:', JSON.stringify(body, null, 2));

    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      console.error('[API] Invalid messages format');
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('[API] Streaming response from OpenAI');
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    });

    console.log('[API] Converting to stream response');
    return result.toDataStreamResponse({
      getErrorMessage: (error: unknown) => {
        console.error('[API] Stream error:', error);
        return error instanceof Error ? error.message : String(error);
      }
    });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}