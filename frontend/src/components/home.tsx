import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_user_info } from "../function";

export const HomePage = () => {
    const [userInfo, setUserInfo] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfoData = await get_user_info();
                setUserInfo(userInfoData.username);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProgress(0);
        setShowPercentage(false);
        setShowMessage(false);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setShowPercentage(true);
                    fetchAndSetSuccessMessage(formData);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const fetchAndSetSuccessMessage = async (formData: FormData) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setSuccessMessage(data.score.toString());
            setTimeout(() => {
                setShowMessage(true);
            }, 500);
        } catch (error) {
            console.error("Error fetching success message:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">
                        CV SCORE PRO
                    </div>
                    <div className="text-white text-xl font-bold flex space-x-4">
                        <a href="#who-we-are" onClick={(e) => handleScroll(e, 'who-we-are')}>Who We Are</a>
                        <a href="#our-goal" onClick={(e) => handleScroll(e, 'our-goal')} className="ml-4">Our Goal</a>
                        <a href="#contributors" onClick={(e) => handleScroll(e, 'contributors')} className="ml-4">Contributors</a>
                    </div>
                    <button onClick={handleLogout} className="text-white">Logout</button>
                </div>
            </nav>
            <section id="who-we-are" className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">Who We Are</h2>
                <p className="text-gray-700 text-lg">We are a team of passionate developers dedicated to creating innovative solutions to simplify and enhance the job application process. Our diverse backgrounds and expertise in technology and human resources drive our mission to connect the right talent with the right opportunities.</p>
            </section>
            <section id="our-goal" className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Goal</h2>
                <p className="text-gray-700 text-lg">Our goal is to create the best software that leverages machine learning to match job seekers with job openings. We aim to reduce the time and effort spent on finding the right candidates for the right positions, making the recruitment process more efficient and effective.</p>
            </section>
            <section id="contributors" className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Contributors</h2>
                <p className="text-gray-700 text-lg mb-4">Furkan İbiş</p>
                <div className="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/furkanibis/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-8 w-8" />
                    </a>
                    <a href="https://www.github.com/furkannibis" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-8 w-8" />
                    </a>
                </div>
            </section>
            <section id="form-section" className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Welcome {userInfo}!</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="job_title" placeholder="Job Title" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                    <input type="text" name="industry" placeholder="Industry" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                    <textarea name="job_description" rows={4} placeholder="Job Description" className="mb-4 p-2 border border-gray-300 rounded w-full" required></textarea>
                    <label htmlFor="cvUpload" className="block text-gray-700 font-bold mb-2">Upload Your CV</label>
                    <input type="file" id="cvUpload" name="cv_file" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                    <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </form>
                <div className="relative pt-1 mt-4">
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out">{progress}%</div>
                    </div>
                </div>
                {showPercentage && (
                    <div className="text-5xl font-bold text-center text-blue-500 transition-opacity duration-500 ease-out">
                        {successMessage}%
                    </div>
                )}
            </section>
        </div>
    );
};