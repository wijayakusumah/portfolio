import { createClient } from '@/supabase/client';

export async function fetchPosition() {
  const supabase = await createClient();
  // Mengambil data proyek dari Supabase
  const { data, error } = await supabase.from('position').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
