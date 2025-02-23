import React, { useState, useEffect  } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { Facebook, Instagram, Mail, User, Lock, EyeOff, Eye, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Component
const Toast = ({ message, type, onClose }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-auto sm:min-w-[320px] sm:max-w-[400px] px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-2 z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className='flex items-center gap-2'>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-white" />
      ) : (
        <AlertCircle className="w-5 h-5 text-white" />
      )}
      <span className="text-white flex-grow text-sm sm:text-base">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
);

// API client setup
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = {
    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw responseData; // Throw the entire response so we can access field-specific errors
        }

        return responseData;
    }
};

// Input Component
const Input = ({ type, name, placeholder, value, onChange, error, className = '', icon: Icon, rightIcon: RightIcon }) => (
    <div className="relative">
        {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon className="h-5 w-5" />
            </div>
        )}
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-10 py-2 rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${Icon ? 'pl-10' : ''} 
                ${RightIcon ? 'pr-10' : ''}
                ${className}`}
        />
        {RightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {RightIcon}
            </div>
        )}
    </div>
);

// Button Component
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

// Terms and Conditions Modal Component
const TermsAndConditionsModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">Terms and Conditions</h3>
            <div className="prose prose-sm">
                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h4>2. User Account</h4>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

                <h4>3. Privacy Policy</h4>
                <p>Your use of the service is subject to our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>

                <h4>4. Electronic Communications</h4>
                <p>By using this service, you consent to receive electronic communications from us.</p>

                <h4>5. Account Security</h4>
                <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>

                <h4>6. Termination</h4>
                <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.</p>

                <h4>7. Changes to Terms</h4>
                <p>We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review these pages periodically.</p>

                <h4>8. Contact Information</h4>
                <p>If you have any questions about these Terms, please contact us at support@example.com.</p>
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={onClose} className="ml-2">
                    Close
                </Button>
            </div>
        </div>
    </div>
);

// Social Login Button Component
const SocialButton = ({ provider, icon: Icon, onClick, disabled }) => (
    <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className="flex items-center justify-center hover:bg-gray-50 w-full"
    >
        <Icon className="w-5 h-5" />
    </Button>
);

// Main SignupForm Component
const SignupForm = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const [toast, setToast] = useState(null);

    // Show toast message
    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };


    useEffect(() => {
        if (location.state?.error) {
            showToast(location.state.error, 'error');
            // Clear the error from location state to prevent it from persisting
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Name validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            // showToast('Password is required', 'error');
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            showToast('Password must be at least 8 characters', 'error');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase and numbers';
            showToast('Password requirements not met', 'error');
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms acceptance validation
        if (!formData.acceptedTerms) {
            newErrors.acceptedTerms = 'You must accept the Terms and Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    password: formData.password,
                    password2: formData.confirmPassword,
                    tc: true
                })
            });
    
            const data = await response.json(); // Parsing response first for both success and error cases
    
            if (!response.ok) {
                throw data; // Throw the entire response JSON if not OK
            }
    
            // ✅ On successful registration
            if (data.token?.access && data.token?.refresh) {
                localStorage.setItem('authToken', JSON.stringify(data.token));
                showToast('Account created successfully!', 'success');
    
                setTimeout(() => {
                    navigate('/verify-email', { state: { email: formData.email, name: formData.name } });
                }, 1500);
            } else {
                throw new Error('Invalid token response from server');
            }
    
        } catch (error) {    
            // ✅ Handling error messages from the backend properly
            if (error?.errors) {
                const fieldErrors = {};
    
                Object.entries(error.errors).forEach(([field, messages]) => {
                    const message = Array.isArray(messages) ? messages[0] : messages;
                    fieldErrors[field] = message;
                    showToast(message, 'error');
                });
    
                setErrors(prev => ({
                    ...prev,
                    ...fieldErrors
                }));
    
                if (error.errors.non_field_errors) {
                    const nonFieldError = Array.isArray(error.errors.non_field_errors)
                        ? error.errors.non_field_errors[0]
                        : error.errors.non_field_errors;
                    showToast(nonFieldError, 'error');
                }
            } else if (error.detail) {
                showToast(error.detail, 'error');
            } else if (error.message) {
                showToast(error.message, 'error');
            } else {
                showToast('Failed to create an account. Please try again.', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleSocialAuth = async (provider) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(`/auth/${provider.toLowerCase()}`, {});
            window.location.href = response.authUrl;
        } catch (error) {
            const errorMessage = `Failed to authenticate with ${provider}`;
            // setSignupError(errorMessage);
            showToast(errorMessage, 'error');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            {showTerms && <TermsAndConditionsModal onClose={() => setShowTerms(false)} />}
            
            <Card className="w-full text-black max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black text-center">Create an account</CardTitle>
                    <p className="text-sm text-gray-500 text-center">Enter your details to create your account</p>
                </CardHeader>

                <CardContent>
                    {signupError && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-red-500 text-sm font-normal text-left p-0">
                                {signupError}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                icon={Mail}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Name Input */}
                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                icon={User}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                icon={Lock}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                }
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                icon={Lock}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                }
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="acceptedTerms"
                                    checked={formData.acceptedTerms}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I accept the{' '}
                                    <button
                                        type="button"
                                        onClick={() => setShowTerms(true)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Terms and Conditions
                                    </button>
                                </label>
                            </div>
                            {errors.acceptedTerms && (
                                <p className="text-sm text-red-500">{errors.acceptedTerms}</p>
                            )}
                        </div>

                        {/* Submit Button */}
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
                </CardContent>
            </Card>
            {/* Toast Notifications */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SignupForm;