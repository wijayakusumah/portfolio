import { createClient } from '@/supabase/client';

export async function fetchProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('projects').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
