import { FormEvent, useState } from "react";

type Props = {
  initial?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
};

export function TaskForm({ initial = "", onSubmit, onCancel }: Props) {
  const [content, setContent] = useState(initial);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setContent("");
  };

  return (
    <form onSubmit={handle} className="flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-2 py-1 border rounded"
        placeholder="Nueva tarea…"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Guardar
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border rounded"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
