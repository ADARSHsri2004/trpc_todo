import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function UpdateTodo() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const updateTodo = trpc.todo.updateTodo.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateTodo.mutate(
            { id, title, description },
            {
                onSuccess: () => alert("Todo updated!"),
                onError: (err) => alert(err.message),
            }
        );
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Update Todo</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Todo ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="New Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="New Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    );
}
