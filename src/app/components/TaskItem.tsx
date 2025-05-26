import { useState } from "react";
import { TaskForm } from "./TaskList";

export type TaskType = {
  id: string;
  content: string;
  isComplete: boolean;
};

type Props = {
  task: TaskType;
  onUpdate: (task: TaskType) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleComplete = () => {
    onUpdate({ ...task, isComplete: !task.isComplete });
  };

  const saveEdit = (newContent: string) => {
    onUpdate({ ...task, content: newContent });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm
        initial={task.content}
        onSubmit={saveEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 p-2 border-b">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={toggleComplete}
        />
        <span className={task.isComplete ? "line-through text-gray-500" : ""}>
          {task.content}
        </span>
      </label>
      <div className="flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-sm"
        >
          ✏️
        </button>
        <button onClick={() => onDelete(task.id)} className="px-2 py-1 text-sm">
          🗑️
        </button>
      </div>
    </div>
  );
}
