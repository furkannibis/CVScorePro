import { useState, useEffect } from "react";
import { get_user_info } from "../function";


export const HomePage = () => {
    const [userInfo, setUserInfo] = useState(null);

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

    return (
        <div className="p-4">
            {userInfo ? (
                <p>Welcome, {userInfo}!</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
