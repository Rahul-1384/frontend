import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

const Input = ({ type, name, placeholder, value, onChange, error, className, icon: Icon }) => (
    <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon}</div>}
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-10 py-2 rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} 
        focus:outline-none focus:ring-2 focus:ring-blue-500 ${Icon ? 'pl-10' : ''} ${className}`}
        />
    </div>
);

const Button = ({ children, onClick, disabled, variant = 'primary', className = '', type = 'button' }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
    </div>
);

const Alert = ({ children, variant = 'error' }) => {
    const variants = {
        error: 'bg-red-50 text-red-700 border-red-200',
        success: 'bg-green-50 text-green-700 border-green-200'
    };

    return (
        <div className={`p-4 mb-4 rounded-md border ${variants[variant]} flex gap-x-2 items-center`}>
            <AlertCircle className="h-4 w-4" />
            {children}
        </div>
    );
};

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useAuth(); // Get login function from context
    const [showToast, setShowToast] = useState(false);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const params = new URLSearchParams(location.search);
    const returnUrl = params.get('returnUrl');

    const from = returnUrl || location.state?.from?.pathname || '/';
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        if (!validateForm()) return;

        // const existingToken = localStorage.getItem("authToken");
        // if (existingToken) {
        //     navigate("/", { replace: true }); // Redirect if already logged in
        //     return;
        // }

        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", formData);
            const { token } = response.data; // Extract token object

            // console.log("Login Successful", response.data);
            loginUser(token); // Pass token to AuthContext
            setShowToast(true); // Show the toast notification
            
            // Hide the toast after 3 seconds and then navigate
            setTimeout(() => {
                setShowToast(false);
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 300); // Wait for toast exit animation
            }, 1500);

            // navigate("/", { replace: true });
        } catch (error) {
            setLoginError(error.response?.data?.message || "Invalid email or password");
            console.error("Error Response:", error.response);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Toast 
                message="Login successful! Redirecting..." 
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
            <Card className="w-full max-w-md p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-sm text-gray-500">Please enter your credentials to login</p>
                </div>

                {loginError && (
                    <Alert className="mb-4">
                        {loginError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            icon={<Mail className="h-5 w-5" />}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                icon={<Lock className="h-5 w-5" />}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/forgot-password')}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Sign up
                    </button>
                </p>
            </Card>
        </div>
    );
};

export default LoginForm;