import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2048, temperature: 0.7 }),
    });
    if (!response.ok) return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status });
    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No response." });
  } catch (err) {
    return NextResponse.json({ error: "Request failed: " + String(err) }, { status: 500 });
  }
}
