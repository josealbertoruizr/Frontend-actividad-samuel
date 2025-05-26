import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from('todos').delete().eq('id', params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({}, { status: 204 });
}
