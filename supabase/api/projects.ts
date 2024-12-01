import { createClient } from '@/supabase/client';

export async function fetchProjects() {
  const supabase = await createClient();
  // Mengambil data proyek dari Supabase
  const { data, error } = await supabase.from('projects').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
