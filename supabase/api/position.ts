import { createClient } from '@/supabase/client';

export async function fetchPosition() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('position').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
