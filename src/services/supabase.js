import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://phuwpkimsyehvzbpavtv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodXdwa2ltc3llaHZ6YnBhdnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMzYyOTYsImV4cCI6MjAzMDgxMjI5Nn0.ERsQOz7ig46-4pNd-wRnnmx74HNlPw8Eu6MCsD_EuRw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
