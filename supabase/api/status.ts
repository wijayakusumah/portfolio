import { createClient } from '@/supabase/client';

export async function fetchStatus() {
  const supabase = await createClient();
  // Mengambil data proyek dari Supabase
  const { data, error } = await supabase.from('status').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
