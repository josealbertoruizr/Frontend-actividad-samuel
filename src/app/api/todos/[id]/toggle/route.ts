import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data: existing, error: fetchError } = await supabase
    .from('todos')
    .select('completed')
    .eq('id', id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json(
      { error: 'No se encontró la tarea' },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from('todos')
    .update({ completed: !existing.completed })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}
