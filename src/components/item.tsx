type Props = {
  todo: {
    _id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function Item({ todo, onToggle, onDelete }: Props) {
  return (
    <li className='flex items-center gap-2 p-2 border-b'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
        className='w-4 h-4 cursor-pointer'
      />
      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo._id)}
        className='text-red-500 hover:text-red-700'
      >
        🗑️
      </button>
    </li>
  );
}
