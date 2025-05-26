const BASE_URL = '/api/todos';

export async function getTodos() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener tareas');
  const data = await res.json();
  // Map _id to id if needed
  return data.map((todo: any) => ({
    ...todo,
    id: todo.id ?? todo._id,
  }));
}

export async function createTodo(text: string) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
}

export async function toggleTodo(id: string) {
  const res = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al actualizar tarea');
  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar tarea');
  return res.json();
}
