"use client";

import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/hooks/api";
import Item from "@/components/item";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    // si quieres precargar algo, podrías llamar a load()
  }, []);

  const handleAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Llamas al endpoint y recibes el objeto creado
    const created: any = await createTodo(trimmed);

    // Lo insertas directamente en tu estado
    setTodos((prev) => [created, ...prev]);

    setText("");
  };

  const handleToggle = async (id: string) => {
    await toggleTodo(id);
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    load();
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4 container">
      <h1 className="text-2xl font-bold mb-4">To-do</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 flex h-12 w-full items-center rounded-2xl border-transparent bg-[#F5F5F5] pl-4 pr-1 font-semibold shadow-none text-base text-[#232323]"
          placeholder="Nueva tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="flex h-12 px-4 py-2 cursor-pointer items-center justify-center rounded-2xl bg-[#4EAFFE] font-semibold text-white select-none disabled:cursor-wait disabled:bg-[#4EAFFE]/40 transform transition-transform duration-200 ease-out hover:scale-95 active:scale-95 disabled:scale-100"
        >
          Agregar
        </button>
      </div>

      <ul className="bg-white shadow rounded divide-y">
        {todos.map((todo) => (
          <Item
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}
