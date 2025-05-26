import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Inicializa el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: devuelve todas las tareas
export async function GET() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: crea una nueva tarea
export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = body.text?.trim();

  if (!text) {
    return NextResponse.json({ error: 'Texto requerido' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('todos')
    .insert({ text, completed: false })
    .select()
    .single(); // Devuelve un solo objeto

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data); // Devuelve la tarea creada
}
