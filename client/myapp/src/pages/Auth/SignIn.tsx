import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signin = trpc.user.signin.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signin.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    if (data.token) {
                        // Store token in localStorage
                        localStorage.setItem("token", data.token);
                    }
                }
            }
        );
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Sign In
                </button>
            </form>
        </div>
    );
}
