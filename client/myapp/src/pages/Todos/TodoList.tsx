import { trpc } from "../../api/trpc";

export default function TodoList() {
    const { data, isLoading, error } = trpc.todo.getAllTodos.useQuery()

    if (isLoading) return <p>Loading todos...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Todos</h2>
            <ul className="space-y-3">
                {data?.todos.map((todo) => (
                    <li key={todo.id} className="border p-3 rounded">
                        <h3 className="font-semibold">{todo.title}</h3>
                        <p>{todo.description}</p>
                        <span className="text-sm text-gray-500">
                            {todo.completed ? "✅ Done" : "❌ Not Done"}
                        </span>
                        <p className="text-xs text-gray-400">
                            Created: {new Date(todo.createdAt).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                            Updated: {new Date(todo.updatedAt).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
