// contact.ts
import { createClient } from '@/supabase/client';

export async function postContact(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const supabase = await createClient();

  // Insert data into Supabase 'contact' table
  const { data, error } = await supabase.from('contact').insert([formData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
