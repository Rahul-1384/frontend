import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Lock } from "lucide-react";

const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
        <div className={met ? "text-green-500" : "text-gray-400"}>
            <CheckCircle2 className="h-4 w-4" />
        </div>
        <span className={met ? "text-green-700" : "text-gray-500"}>{text}</span>
    </div>
);

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    // Password strength requirements
    const requirements = {
        length: formData.newPassword.length >= 8,
        number: /\d/.test(formData.newPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
        capital: /[A-Z]/.test(formData.newPassword),
    };

    const allRequirementsMet = Object.values(requirements).every(Boolean);
    const passwordsMatch = formData.newPassword === formData.confirmPassword;
    const oldNewDifferent = formData.oldPassword !== formData.newPassword;

    useEffect(() => {
        const tokenData = localStorage.getItem("authToken");
        if (!tokenData) {
            setMessage({ type: "error", text: "Session expired. Please log in again." });
            navigate("/login");
        }
    }, [navigate]);

    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        setMessage({ type: "", text: "" });
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChangePassword = async () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setMessage({ type: "error", text: "All fields are required." });
            return;
        }
    
        if (!passwordsMatch) {
            setMessage({ type: "error", text: "New passwords do not match." });
            return;
        }
    
        if (!oldNewDifferent) {
            setMessage({ type: "error", text: "New password must be different from the old password." });
            return;
        }
    
        if (!allRequirementsMet) {
            setMessage({ type: "error", text: "Please meet all password requirements." });
            return;
        }
    
        try {
            setLoading(true);
            const tokenData = localStorage.getItem("authToken");
            const accessToken = tokenData ? JSON.parse(tokenData)?.access : null;
    
            if (!accessToken) {
                setMessage({ type: "error", text: "Session expired. Please log in again." });
                navigate("/login");
                return;
            }
    
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/changepassword/",
                {
                    old_password: formData.oldPassword,
                    password: formData.newPassword,
                    password2: formData.confirmPassword,
                },
                { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
            );
    
            setMessage({ type: "success", text: response.data.message || "Password changed successfully!" });
    
            setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    
            // Logout user and navigate to login
            localStorage.removeItem("authToken");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            let errorMsg = "Failed to change password. Please try again.";
            
            if (error.response?.data) {
                const errorData = error.response.data;
    
                if (typeof errorData === "object") {
                    errorMsg = Object.values(errorData).flat().join(" ");
                } else if (typeof errorData === "string") {
                    errorMsg = errorData;
                }
            }
    
            setMessage({ type: "error", text: errorMsg });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <p><Lock className="h-5 w-5" /></p>
                            <p className="text-2xl font-semibold">Change Password</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Please enter your current password and choose a new one</p>
                    </div>

                    {message.text && (
                        <div
                            className={`p-4 mb-6 rounded-lg flex items-start gap-2 ${message.type === "error"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-green-50 text-green-700 border border-green-200"
                                }`}
                        >
                            <AlertCircle className="h-5 w-5 mt-0.5" />
                            <p>{message.text}</p>
                        </div>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            handleChangePassword();
                        }}
                    >
                        <div className="space-y-4">
                            {[
                                { field: "oldPassword", label: "Current Password" },
                                { field: "newPassword", label: "New Password" },
                                { field: "confirmPassword", label: "Confirm New Password" },
                            ].map(({ field, label }) => (
                                <div key={field} className="space-y-2">
                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                        {label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={field}
                                            type={showPassword[field.replace("Password", "").toLowerCase()] ? "text" : "password"}
                                            value={formData[field]}
                                            onChange={handleInputChange(field)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                                            onClick={() => togglePasswordVisibility(field.replace("Password", "").toLowerCase())}
                                        >
                                            {showPassword[field.replace("Password", "").toLowerCase()] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {formData.newPassword && (
                            <div className="mt-4 space-y-2">
                                <label className="block text-sm text-gray-500">Password Requirements</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <PasswordRequirement met={requirements.length} text="At least 8 characters" />
                                    <PasswordRequirement met={requirements.capital} text="One uppercase letter" />
                                    <PasswordRequirement met={requirements.number} text="One number" />
                                    <PasswordRequirement met={requirements.special} text="One special character" />
                                </div>
                            </div>
                        )}

                        <button
                            className={`w-full mt-6 px-4 py-2 rounded-lg text-white font-medium transition ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            onClick={handleChangePassword}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Changing Password...
                                </span>
                            ) : (
                                "Change Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
