const IP = `http://127.0.0.1:8000`

export async function login_query(username: string, password: string) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "username": username,
            "password": password
        }).toString()
    };

    try {
        const response = await fetch(`${IP}/login`, requestOptions);
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return {
            error: "An error occurred while fetching data."
        };
    }
}


export async function get_user_info() {
    const tokenValue = localStorage.getItem("token");
    if (!tokenValue) {
        throw new Error("Token is null");
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenValue}`
        },
        body: JSON.stringify({})
    };

    try {
        const response = await fetch(`${IP}/home`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}