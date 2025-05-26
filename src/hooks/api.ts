const BASE_URL = 'http://localhost:5000/todos';

export async function getTodos() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
}

export async function createTodo(text: string) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Error al crear tarea');
}

export async function toggleTodo(id: string) {
  const res = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al actualizar tarea');
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar tarea');
}
