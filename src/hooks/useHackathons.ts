import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Hackathon {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  theme: string[];
  url: string;
  image_url: string | null;
  source: string;
  last_updated: string;
  created_at: string;
}

export const useHackathons = () => {
  return useQuery({
    queryKey: ['hackathons'],
    queryFn: async () => {
      console.log('Fetching hackathons from database');
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error fetching hackathons:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} hackathons`);
      return data as Hackathon[];
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export const useTriggerFetch = () => {
  return async () => {
    console.log('Triggering hackathon fetch from APIs');
    const { data, error } = await supabase.functions.invoke('fetch-hackathons');
    
    if (error) {
      console.error('Error triggering fetch:', error);
      throw error;
    }
    
    console.log('Fetch triggered successfully:', data);
    return data;
  };
};
