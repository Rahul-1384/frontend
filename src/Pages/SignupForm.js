

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Mail, User, Lock, EyeOff, Eye, AlertCircle } from 'lucide-react';


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
        <div className={`p-4 rounded-md border ${variants[variant]} flex items-center space-x-2`}>
            <AlertCircle className="h-4 w-4" />
            {children}
        </div>
    );
};

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase and numbers';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupError('');

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Navigate programmatically or use a callback
            console.log('Signup successful:', formData);
        } catch (error) {
            setSignupError('Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialAuth = async (provider) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`${provider} auth initiated`);
        } catch (error) {
            setSignupError(`Failed to authenticate with ${provider}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <p className="text-sm text-gray-500">Enter your details to create your account</p>
                </div>

                {signupError && (
                    <Alert className="mb-4">
                        {signupError}
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
                        <Input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            icon={<User className="h-5 w-5" />}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
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

                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                icon={<Lock className="h-5 w-5" />}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                                Creating account...
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => handleSocialAuth('Google')}
                        disabled={isLoading}
                        className="flex items-center justify-center hover:bg-gray-50"
                    >
                        <svg viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleSocialAuth('Facebook')}
                        disabled={isLoading}
                        className="flex items-center justify-center hover:bg-gray-50"
                    >
                        <svg
                            className="w-6 h-6 text-blue-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.92 3.56 9 8.2 9.92v-6.92h-2.5v-3h2.5v-2.3c0-2.42 1.49-3.77 3.65-3.77 1.06 0 2.16.19 2.16.19v2.34H15.8c-1.26 0-1.66.79-1.66 1.6v1.94h2.8l-.45 3h-2.35v6.92C18.44 21.07 22 16.99 22 12.07z"
                            />
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleSocialAuth('Instagram')}
                        disabled={isLoading}
                        className="flex items-center justify-center hover:bg-gray-50"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <defs>
                                <linearGradient
                                    id="instagram-gradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#f09433" />
                                    <stop offset="25%" stopColor="#e6683c" />
                                    <stop offset="50%" stopColor="#dc2743" />
                                    <stop offset="75%" stopColor="#cc2366" />
                                    <stop offset="100%" stopColor="#bc1888" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#instagram-gradient)"
                                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.5 2A1.25 1.25 0 1 1 20 7.25 1.25 1.25 0 0 1 16.25 6zM12 7.5a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 12 7.5zm0 2a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5z"
                            />
                        </svg>

                    </Button>
                </div>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Login
                    </button>
                </p>
            </Card>
        </div>
    );
};

export default SignupForm;