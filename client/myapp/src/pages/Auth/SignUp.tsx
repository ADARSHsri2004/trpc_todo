import { useState } from "react";
import { trpc } from "../../api/trpc";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const signup = trpc.user.signup.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup.mutate(
            { email, password, name },
            {
                onSuccess: () => alert("User registered!"),
                onError: (err) => alert(err.message),
            }
        );
       
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
                <input
                    type="name"
                    placeholder="Name"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
