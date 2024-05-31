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
        return false;
    }
}

export async function create_new_user(username: string, email: string, password: string, repassword: string) {
    if (password !== repassword) {
        return "Passwords do not match!";
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    };

    try {
        const response = await fetch(`${IP}/signup`, requestOptions);
        if (!response.ok && response.status === 400) {
            return "Username or password already in use!"
        }
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return "An error occurred during registration.";
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

export async function fetchSuccessMessage(formData: FormData) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch success message');
    }

    const data = await response.json();
    return data;
}
