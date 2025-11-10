'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
export default function Home() {
  const [url, setUrl] = useState('');
  const [shortId, setShortId] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('URL submitted:', url);
      const response = await fetch('/api/urls/submit-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      console.log('Success:', data);
      setShortId(data.shortId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen flex-col w-full max-w-3xl  items-center py-32 px-16 ">
        <h1>localhost:3000/{shortId}</h1>
        <div className="flex w-full gap-4">
          <Input
            type="text"
            placeholder="Enter your url here..."
            className="w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button size="lg" onClick={handleSubmit}>
            Click Me
          </Button>
        </div>
      </main>
    </div>
  );
}
