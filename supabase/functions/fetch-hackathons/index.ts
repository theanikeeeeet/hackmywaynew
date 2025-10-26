import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MLHEvent {
  name: string;
  url: string;
  'event-start': string;
  'event-end': string;
  'register-by': string;
  location: string;
  'banner-background': string;
  themes?: string[];
}

interface DevpostHackathon {
  title: string;
  url: string;
  submission_period_dates: string;
  thumbnail_url?: string;
  displayed_location: {
    location: string;
  };
  themes?: Array<{ name: string }>;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting to fetch hackathons from MLH and Devpost');

    // Fetch from MLH
    const mlhResponse = await fetch('https://mlh.io/seasons/2025/events.json');
    const mlhData: MLHEvent[] = await mlhResponse.json();
    console.log(`Fetched ${mlhData.length} events from MLH`);

    // Fetch from Devpost
    const devpostResponse = await fetch('https://devpost.com/api/hackathons?status[]=upcoming&status[]=open');
    const devpostData = await devpostResponse.json();
    const devpostHackathons: DevpostHackathon[] = devpostData.hackathons || [];
    console.log(`Fetched ${devpostHackathons.length} events from Devpost`);

    // Normalize and insert MLH data
    const mlhInserts = mlhData.map((event) => {
      // Parse dates
      const startDate = new Date(event['event-start']);
      const endDate = new Date(event['event-end']);
      
      // Determine location type
      let location = 'Hybrid';
      if (event.location && typeof event.location === 'string') {
        if (event.location.toLowerCase().includes('online')) {
          location = 'Online';
        } else if (!event.location.toLowerCase().includes('online')) {
          location = 'Offline';
        }
      }

      return {
        title: event.name,
        description: `MLH hackathon: ${event.name}`,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        location,
        theme: event.themes || [],
        url: event.url,
        image_url: event['banner-background'] || null,
        source: 'MLH',
      };
    });

    // Normalize and insert Devpost data
    const devpostInserts = devpostHackathons.map((event) => {
      // Parse dates from submission_period_dates like "Jan 01, 2025 - Feb 01, 2025"
      const dates = event.submission_period_dates.split(' - ');
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1] || dates[0]);

      // Determine location
      let location = 'Online';
      if (event.displayed_location?.location) {
        const loc = event.displayed_location.location.toLowerCase();
        if (loc.includes('hybrid')) {
          location = 'Hybrid';
        } else if (!loc.includes('online') && !loc.includes('remote')) {
          location = 'Offline';
        }
      }

      return {
        title: event.title,
        description: `Devpost hackathon: ${event.title}`,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        location,
        theme: event.themes?.map(t => t.name) || [],
        url: event.url,
        image_url: event.thumbnail_url || null,
        source: 'Devpost',
      };
    });

    // Combine all inserts
    const allInserts = [...mlhInserts, ...devpostInserts];
    console.log(`Total events to insert: ${allInserts.length}`);

    // Insert or update hackathons (upsert based on URL)
    let successCount = 0;
    let errorCount = 0;

    for (const hackathon of allInserts) {
      const { error } = await supabase
        .from('hackathons')
        .upsert(hackathon, { onConflict: 'url' });

      if (error) {
        console.error(`Error inserting ${hackathon.title}:`, error);
        errorCount++;
      } else {
        successCount++;
      }
    }

    console.log(`Inserted/updated ${successCount} hackathons, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Fetched and stored ${successCount} hackathons`,
        sources: {
          mlh: mlhData.length,
          devpost: devpostHackathons.length,
        },
        errors: errorCount,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
