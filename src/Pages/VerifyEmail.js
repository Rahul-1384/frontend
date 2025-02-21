import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';


// Toast Component
const Toast = ({ message, type, onClose }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-auto sm:min-w-[320px] sm:max-w-[400px] px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-white" />
      ) : (
        <AlertCircle className="w-5 h-5 text-white" />
      )}
      <span className="text-white flex-grow text-sm sm:text-base">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
  
  // Success Screen Component
  const SuccessScreen = ({ email }) => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
  
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Email Verified!
        </h1>
  
        <p className="text-base text-gray-600 mb-8">
          Your account has been successfully created
        </p>
  
        <button
          onClick={() => window.location.href = '/login'}
          className="w-full sm:w-auto px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );


const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Email extraction and validation
    const { email, name } = location.state || {};


    useEffect(() => {
        if (!email || !name) {
            console.log('Missing required state data:', { email, name });
            showToast('Please complete the signup process first', 'error');
            setTimeout(() => {
                navigate('/signup', { 
                    state: { 
                        error: 'Please sign up with your email first' 
                    }
                });
            }, 2000); // Give time for the toast to be visible before navigation
            return;
        }

        generateAndSendOTP();
    }, [email, navigate]); // Added name to dependencies

    const maskedEmail = email ? email.replace(/(\w)([\w.-]*)(\w)@([\w.]+)/g, '$1*****$3@$4') : '';
  
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        return () => {
            sessionStorage.removeItem('otpSent');
        };
    }, []);

    // Show toast message
    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Timer for resend button
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const generateAndSendOTP = async () => {
        if (!email) {
            console.error('No email available for OTP generation');
            return;
        }

        setIsLoading(true);
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOTP);

        try {
            const templateParams = {
                to_name: name,
                to_email: email,
                otp: newOTP,
            };

            await emailjs.send(
                'service_swwsv3a',
                'template_pi32v5t',
                templateParams,
                'ozNZvvM_KCQA3q7YP'
            );
            
            showToast('OTP sent successfully! Check your email', 'success');
        } catch (error) {
            console.error('Failed to send email:', error);
            showToast('Failed to send verification code', 'error');
        } finally {
            setIsLoading(false);
            setIsInitialLoading(false);
        }
    };

    // Handle OTP input
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple digits
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear any existing errors when user starts typing
        if (error) setError('');

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
            if (nextInput) nextInput.focus();
        }
    };

    // Handle key press for backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = [...otp];
            pastedData.split('').forEach((char, index) => {
                if (index < 6) newOtp[index] = char;
            });
            setOtp(newOtp);
            setError(''); // Clear any existing errors
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const otpString = otp.join('');
    
        if (otpString.length !== 6) {
          showToast('Please enter a complete 6-digit code', 'error');
          return;
        }
    
        setIsLoading(true);
        try {
          if (otpString === generatedOTP) {
            showToast('Verification successful!', 'success');
            setTimeout(() => {
              setShowSuccessScreen(true);
              setTimeout(() => {
                navigate('/login', { 
                  state: { 
                    message: 'Email verified successfully! Please login to continue.' 
                  }
                });
              }, 2000);
            }, 1000);
          } else {
            throw new Error('Invalid verification code');
          }
        } catch (error) {
          showToast(error.message, 'error');
          setOtp(['', '', '', '', '', '']);
        } finally {
          setIsLoading(false);
        }
      };
    
      if (showSuccessScreen) {
        return <SuccessScreen email={email} />;
      }

      const handleResend = async () => {
        if (!canResend) return;
        
        setIsLoading(true);
        try {
            await generateAndSendOTP();
            setResendTimer(30);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            showToast('New OTP sent successfully!', 'success');
        } catch (error) {
            showToast('Failed to resend verification code', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-black font-bold text-center">Verify your email</CardTitle>
                    <p className="text-sm text-gray-500 text-center px-4">
                        We've sent a verification code to {maskedEmail}
                    </p>
                </CardHeader>

                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-red-600 text-sm font-normal">{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center space-x-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={`otp-${index}`}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 text-black h-12 text-center text-lg font-semibold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                                    maxLength={1}
                                    pattern="\d*"
                                    inputMode="numeric"
                                    style={{ backgroundColor: 'white' }}
                                    autoComplete="off"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Verify Email</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Didn't receive the code?{' '}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={!canResend || isLoading}
                                    className={`text-blue-600 hover:text-blue-800 font-medium ${(!canResend || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
                                </button>
                            </p>
                        </div>
                    </form>
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

export default VerifyEmail;