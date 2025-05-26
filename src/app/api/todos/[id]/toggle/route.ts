import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { data: existing, error: findError } = await supabase
    .from('todos')
    .select('completed')
    .eq('id', params.id)
    .single();

  if (findError)
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 });

  const { data, error } = await supabase
    .from('todos')
    .update({ completed: !existing.completed })
    .eq('id', params.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
