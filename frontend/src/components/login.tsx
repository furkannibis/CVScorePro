import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "admin" && password === "password") {
            setError("");
            setShowError(false);
        } else {
            setError("Unable to log in. Please verify your username and password.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2500);
        }
    };
    return (
        <>
            <div className="relative flex items-center justify-center h-screen bg-gray-100">
                <div className="grid grid-rows-2 gap-4 place-items-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">CV SCORE </span>
                        PRO.
                    </h1>
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Access Account
                        </button>
                    </form>
                    <div className="flex items-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
                            Join Now and Get Access!
                        </span>
                        <Link to="/signup" className="border border-emerald-600 rounded-lg p-2.5 hover:border-blue-500 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
                            Join
                        </Link>
                    </div>
                </div>
                {error && (
                    <div className={`absolute top-4 right-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 duration-500 ${showError ? 'opacity-100' : 'opacity-0'}`}>
                        {error}
                    </div>
                )}
            </div>
        </>
    );
};
