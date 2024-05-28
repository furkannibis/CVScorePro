import { useState } from "react";
import { Link } from "react-router-dom";
import { create_new_user } from "../function";

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const [success, setSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const new_user_status = await create_new_user(username, email, password, repassword);
        setSuccess(new_user_status);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 2500);
    };

    return (
        <>
            <div className="relative flex justify-center items-center h-screen bg-gray-50">
                <div className="grid grid-rows-3 place-items-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">CV SCORE </span>
                        PRO.
                    </h1>
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSignUp}>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            id="username"
                            placeholder="Username"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="email"
                            placeholder="Email"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            id="password"
                            placeholder="Password"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        />
                        <input
                            type="password"
                            value={repassword}
                            onChange={(event) => setRePassword(event.target.value)}
                            id="repassword"
                            placeholder="Password Again"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        />

                        <button className="text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Create Account</button>
                    </form>
                    <div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">Have an account?</span>
                        <Link to="/" className="border border-emerald-600 rounded-lg p-2.5 hover:border-blue-500 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">Sign in.</Link>
                    </div>
                </div>
                {success && (
                    <div className={`absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                        {success}
                    </div>
                )}
            </div>
        </>
    );
};
