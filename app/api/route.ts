import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log('Request URL:', request.url);
  const id = searchParams.get('id');
  console.log('Fetching long URL for shortId:', id);
  if (!id) {
    const { data: URL } = await supabase
      .from('URL')
      .select('long')
      .eq('short', id)
      .single();
    if (URL) {
      return new Response(JSON.stringify({ long: URL.long }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ error: 'URL not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
