// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://scvuwmquzwhfnuahzfhz.supabase.co', // your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdnV3bXF1endoZm51YWh6Zmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDg2NDYsImV4cCI6MjA5MDk4NDY0Nn0.JN50NxUqSbwKeL5veq5UMFQJJ5GMOZt6F3OUCRh5kz0'                     
)