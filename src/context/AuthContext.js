import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(
        JSON.parse(localStorage.getItem("authToken")) || null
    );

    const [loading, setLoading] = useState(false); // 🔹 New loading state
    // Login function
    const loginUser = async (tokenObj) => {
      setLoading(true); // Start loading

        await new Promise(resolve => setTimeout(resolve, 1500));

        localStorage.setItem("authToken", JSON.stringify(tokenObj)); // Store both tokens
        setAuthToken(tokenObj);
        fetchUserProfile(tokenObj.access); // Fetch user data immediately
        setLoading(false); // Start loading

    };

    // Logout function
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setUser(null);
    };

    // Fetch user profile
    const fetchUserProfile = async (token) => {
        try {
            if (!token) return;

            const response = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Profile Fetch Error:", error.response);
            if (error.response?.status === 401) {
                await refreshAccessToken();
            }
        }
    };

    // Refresh token
    const refreshAccessToken = async () => {
        try {
            const storedToken = JSON.parse(localStorage.getItem("authToken"));
            if (!storedToken?.refresh) {
                logoutUser();
                return;
            }

            const response = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
                refresh: storedToken.refresh,
            });

            const newTokenObj = {
                access: response.data.access,
                refresh: storedToken.refresh, // Keep the old refresh token
            };

            localStorage.setItem("authToken", JSON.stringify(newTokenObj));
            setAuthToken(newTokenObj);
            fetchUserProfile(newTokenObj.access); // Fetch user profile with new access token
        } catch (error) {
            console.error("Token Refresh Error:", error.response);
            logoutUser();
        }
    };

    // Fetch user on mount if token exists
    useEffect(() => {
        if (authToken?.access) {
            fetchUserProfile(authToken.access);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ user, authToken, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
