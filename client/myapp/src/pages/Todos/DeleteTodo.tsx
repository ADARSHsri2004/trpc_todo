import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function DeleteTodo() {
    const [id, setId] = useState("");
    const deleteTodo = trpc.todo.deleteTodo.useMutation();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteTodo.mutate(
            { id }

        );
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Delete Todo</h2>
            <form onSubmit={handleDelete} className="flex flex-col gap-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Todo ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                </button>
            </form>
        </div>
    );
}
