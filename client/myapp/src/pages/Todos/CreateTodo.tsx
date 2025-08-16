import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createTodo = trpc.todo.createTodo.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTodo.mutate(
            { title, description },
            {
                onSuccess: () => {

                    setTitle("");
                    setDescription("");
                }
            }
        );
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Todo</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 rounded"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
}
