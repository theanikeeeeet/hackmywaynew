-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.update_hackathons_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;