import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://lkuhqvqvjhztgzvcpetk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdWhxdnF2amh6dGd6dmNwZXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MDEwOTIsImV4cCI6MTk5NzQ3NzA5Mn0.5Xq4H0QwRimxr_JoFJwFNl2Uv0Bn3GLXck_pMBDnCNI"
);

console.log(await supabase.auth.signInWithPassword({
  email: "admin@craftex.dev",
  password: "UgG5hnNvBcD2bmb",
}));