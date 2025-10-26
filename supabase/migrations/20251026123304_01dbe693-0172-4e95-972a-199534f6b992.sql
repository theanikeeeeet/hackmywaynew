-- Create hackathons table
CREATE TABLE IF NOT EXISTS public.hackathons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  theme TEXT[] DEFAULT '{}',
  url TEXT NOT NULL UNIQUE,
  image_url TEXT,
  source TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index on source for faster filtering
CREATE INDEX idx_hackathons_source ON public.hackathons(source);

-- Create index on dates for sorting and filtering
CREATE INDEX idx_hackathons_dates ON public.hackathons(start_date, end_date);

-- Enable RLS
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view hackathons)
CREATE POLICY "Anyone can view hackathons"
ON public.hackathons
FOR SELECT
USING (true);

-- Create function to update last_updated timestamp
CREATE OR REPLACE FUNCTION public.update_hackathons_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hackathons_timestamp
BEFORE UPDATE ON public.hackathons
FOR EACH ROW
EXECUTE FUNCTION public.update_hackathons_timestamp();