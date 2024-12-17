import { createClient } from '@/supabase/client';

export async function fetchCategory() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('category').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
