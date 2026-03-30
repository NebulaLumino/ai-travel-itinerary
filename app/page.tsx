"use client";
import { useState } from "react";

export default function TravelItineraryPage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a travel planning expert. Create a detailed travel itinerary and budget planner for:

- Destination: ${destination}
- Travel Dates: ${startDate} to ${endDate}
- Number of Travelers: ${travelers}
- Budget Level: ${budget}
- Travel Style: ${style}

Provide:
1. Day-by-day itinerary with recommended activities, landmarks, and experiences
2. Estimated daily costs for accommodation, food, transport, and activities
3. Total budget breakdown
4. Packing suggestions
5. Local tips and cultural etiquette
6. Recommended booking platforms and tools

Format in clean markdown with tables where helpful.`,
        }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No response.");
    } catch {
      setOutput("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <span className="text-green-400 text-sm font-medium">✈️ AI-Powered</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Travel Itinerary & Budget Planner</h1>
          <p className="text-gray-400">Create detailed travel plans with budget breakdowns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-6">Trip Details</h2>
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Tokyo, Japan" required
                  className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required
                    className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required
                    className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Travelers</label>
                <input type="number" value={travelers} onChange={e => setTravelers(e.target.value)} placeholder="e.g. 2" min="1" required
                  className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Budget Level</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} required
                  className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition">
                  <option value="">Select budget...</option>
                  <option value="Budget ($50-100/day)">Budget ($50-100/day)</option>
                  <option value="Mid-range ($100-250/day)">Mid-range ($100-250/day)</option>
                  <option value="Luxury ($250-500/day)">Luxury ($250-500/day)</option>
                  <option value="Ultra-luxury ($500+/day)">Ultra-luxury ($500+/day)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Travel Style</label>
                <select value={style} onChange={e => setStyle(e.target.value)} required
                  className="w-full bg-gray-800/70 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition">
                  <option value="">Select style...</option>
                  <option value="Adventure & Outdoor">Adventure & Outdoor</option>
                  <option value="Culture & History">Culture & History</option>
                  <option value="Food & Culinary">Food & Culinary</option>
                  <option value="Relaxation & Wellness">Relaxation & Wellness</option>
                  <option value="Family-friendly">Family-friendly</option>
                  <option value="Romantic Getaway">Romantic Getaway</option>
                  <option value="Digital Nomad">Digital Nomad</option>
                </select>
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/20"}`}>
                {loading ? "Planning Trip..." : "Generate Itinerary"}
              </button>
            </form>
          </div>

          <div className="bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-700/50 p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-green-400 mb-6">Generated Itinerary</h2>
            <div className="flex-1 bg-gray-800/40 rounded-xl p-5 overflow-auto max-h-[600px]">
              {output ? (
                <div className="prose prose-invert prose-sm max-w-none text-gray-200 whitespace-pre-wrap">{output}</div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <span className="text-4xl mb-3">🗺️</span>
                  <p className="text-center">Your itinerary will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
