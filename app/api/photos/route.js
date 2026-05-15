import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const orientation = searchParams.get('orientation') || 'landscape';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error('UNSPLASH_ACCESS_KEY is not defined in environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=${orientation}&client_id=${accessKey}`;
    
    const response = await fetch(unsplashUrl);
    
    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trim payload to only what we need to save bandwidth and client memory
    const trimmedData = {
      id: data.id,
      urls: {
        regular: data.urls.regular,
        small: data.urls.small,
        raw: data.urls.raw,
      },
      blur_hash: data.blur_hash,
      user: {
        name: data.user.name,
        links: {
          html: data.user.links.html,
        }
      }
    };

    return NextResponse.json(trimmedData);
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
