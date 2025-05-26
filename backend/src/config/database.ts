import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('❌ SUPABASE_URL environment variable is missing');
  console.error('Please add SUPABASE_URL to your .env file');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('❌ SUPABASE_ANON_KEY environment variable is missing');
  console.error('Please add SUPABASE_ANON_KEY to your .env file');
  process.exit(1);
}

console.log('🔑 Supabase URL loaded:', supabaseUrl.substring(0, 30) + '...');

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    console.error('Make sure your Supabase credentials are correct and the "tasks" table exists');
    return false;
  }
}; 