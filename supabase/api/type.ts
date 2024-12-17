import { createClient } from '@/supabase/client';

export async function fetchType() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('type').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
