import { createClient } from '@/supabase/client';

export async function fetchCompany() {
  const supabase = await createClient();
  // Mengambil data proyek dari Supabase
  const { data, error } = await supabase.from('company').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
