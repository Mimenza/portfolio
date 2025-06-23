import { NextRequest, NextResponse } from 'next/server';

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

        const systemPrompt = `You are Endika's personal assistant. The user is currently viewing the section: ${context} of the portfolio. All his information can be found at https://emimenza.vercel.app/about. Answer accordingly, and if it's 'projects', respond with detailed project-related information.`;

        const openRouterMessages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages.map((msg: Message) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text
            }))
        ];

        const orResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": process.env.SITE_URL || "",
                "X-Title": process.env.SITE_NAME || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528:free",
                messages: openRouterMessages
            }),
        });

        const data = await orResponse.json();

        console.log("OpenRouter API response:", data);

        const generatedText = data?.choices?.[0]?.message?.content || "No response generated.";

        return NextResponse.json({
            response: generatedText
        });
    } catch (error) {
        console.error("OpenRouter API error:", error);
        return NextResponse.json({ response: "Error processing request." }, { status: 500 });
    }
}
