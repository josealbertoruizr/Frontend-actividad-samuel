import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Reemplaza con tus claves de Supabase
const supabaseUrl = 'https://rwwhwouodgooijjmkfai.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d2h3b3VvZGdvb2lqam1rZmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODE5MzgsImV4cCI6MjA2Mzg1NzkzOH0.LokDeGHtV7KMHttiiz8s2E6VDphyFRIAkpbZnr27rs4';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// GET /api/todos - Obtener todas las tareas
app.get('/api/todos', async (_req, res) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/todos - Crear nueva tarea
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto requerido' });

  const { data, error } = await supabase
    .from('todos')
    .insert([{ text, completed: false }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PATCH /api/todos/:id/toggle - Marcar como completada o no
app.patch('/api/todos/:id/toggle', async (req, res) => {
  const id = req.params.id;

  const { data: existing, error: findError } = await supabase
    .from('todos')
    .select('completed')
    .eq('id', id)
    .single();

  if (findError) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { data, error } = await supabase
    .from('todos')
    .update({ completed: !existing.completed })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE /api/todos/:id - Eliminar tarea
app.delete('/api/todos/:id', async (req, res) => {
  const id = req.params.id;

  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

// Rutas de prueba
app.get('/', (_req, res) => {
  res.send('🟢 Backend de To-do colaborativo funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
