import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function TodoById() {
  const [id, setId] = useState("");

  const getTodoById = trpc.todo.getTodoById.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    getTodoById.mutate({ id });
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Get Todo by ID</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Todo ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
          disabled={getTodoById.isPending}
        >
          {getTodoById.isPending ? "Fetching..." : "Fetch"}
        </button>
      </form>

      {getTodoById.error && (
        <p className="text-red-500 mt-2">
          Error: {getTodoById.error.message}
        </p>
      )}

      {getTodoById.data && (
        <div className="mt-4 border p-3 rounded">
          <h3 className="font-semibold">{getTodoById.data.todo.title}</h3>
          <p>{getTodoById.data.todo.description}</p>
          <span className="text-sm text-gray-500">
            {getTodoById.data.success ? "✅ Done" : "❌ Not Done"}
          </span>
        </div>
      )}
    </div>
  );
}
