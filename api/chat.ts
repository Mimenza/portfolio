import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
    sender: 'user' | 'assistant';
    text: string;
};

export async function POST(req: NextRequest) {
    try {
        const { messages, context } = await req.json();

        if (!messages || !context) {
            return NextResponse.json(
                { response: "Missing 'messages' or 'context' in request body." },
                { status: 400 }
            );
        }

        const systemPrompt = `You are Endika's personal assistant. The user is currently viewing the section: ${context}. Answer accordingly, and if it's 'projects', respond with detailed project-related information.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((msg: Message) => ({
                    role: msg.sender === "user" ? "user" : "assistant",
                    content: msg.text
                }))
            ],
            max_tokens: 500
        });

        return NextResponse.json({
            response: response.choices[0].message.content
        });
    } catch (error) {
        console.error("OpenAI error:", error);
        return NextResponse.json({ response: "Error processing request." }, { status: 500 });
    }
}