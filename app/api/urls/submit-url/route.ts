import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  const { data: URL } = await supabase
    .from('URL')
    .select('long')
    .eq('long', url)
    .single();

  console.log('Existing URL:', URL);

  if (!URL) {
    const shortId = uuidv4().slice(0, 6);
    console.log('Generated shortId:', shortId);

    const { error } = await supabase.from('URL').insert([
      {
        long: url,
        short: shortId,
      },
    ]);
    if (error) {
      console.error('Error inserting URL:', error);
      return new Response(JSON.stringify({ error: 'Failed to store URL' }), {
        status: 500,
      });
    }

    console.log('Inserted new URL with shortId:', shortId);
    return new Response(JSON.stringify({ success: true, shortId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.log('URL already exists, no insertion needed.');
    const shortId = await supabase
      .from('URL')
      .select('short')
      .eq('long', url)
      .single()
      .then((res) => res.data?.short);
    return new Response(JSON.stringify({ success: true, shortId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
