import { useState, useEffect } from "react";
import { TaskItem, TaskType } from "./TaskItem";
import { TaskForm } from "./TaskForm";

export function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // Cargar desde localStorage (opcional)
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Sincronizar a localStorage (opcional)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (content: string) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      content,
      isComplete: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (updated: TaskType) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <TaskForm onSubmit={addTask} />
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No hay tareas aún</p>
        )}
      </div>
    </div>
  );
}
