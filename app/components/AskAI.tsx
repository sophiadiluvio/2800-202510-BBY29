'use client';
import { useState } from 'react';

export default function AskAI({ prompt }: { prompt: string }) {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cohere-helper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setAiResponse(data.text || 'No response from AI');
    } catch (error) {
      console.error('AskAI error:', error);
      setAiResponse('Error getting AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-sm text-center px-4">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        {loading ? 'Thinking...' : 'Ask AI "What can I do to help these shelters?"'}
      </button>
      {aiResponse && (
        <p className="mt-3 text-gray-700 bg-gray-100 p-3 rounded whitespace-pre-wrap">
          {aiResponse}
        </p>
      )}
    </div>
  );
}
