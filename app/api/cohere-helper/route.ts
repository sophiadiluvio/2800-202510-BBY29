import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY as string,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await cohere.chat({
      message: prompt,
      model: 'command-r-plus', // or 'command-light' if rate limited
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Cohere API error:', error);
    return NextResponse.json({ error: 'Failed to generate text.' }, { status: 500 });
  }
}
