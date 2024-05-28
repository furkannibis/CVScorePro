import { Link } from "react-router-dom";
import logo from '../items/images/cvpro.webp'; // Logonuzun dosya yolunu güncelleyin

export const ErrorPage = () => {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center h-screen bg-gray-50">
                <img src={logo} alt="CV Score Pro Logo" className="mb-8 w-24 h-24 rounded-full shadow-lg" />
                <h1 className="mb-4 text-6xl font-extrabold text-gray-900 dark:text-white">
                    404
                </h1>
                <h2 className="mb-8 text-2xl font-bold text-gray-700 dark:text-gray-300">
                    Page Not Found
                </h2>
                <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
                    The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link to="/" className="text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    Go Home
                </Link>
            </div>
        </>
    );
};
