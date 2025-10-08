
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Leaf, AlertCircle, CheckCircle, Users, Gavel, ShoppingCart, User } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [isNgoLogin, setIsNgoLogin] = useState(false); // Toggle between organization and individual login
  const [selectedRole, setSelectedRole] = useState('ngo'); // 'ngo', 'regulatory', 'buyer', 'admin'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.email) {
        newErrors.email = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.email.replace(/\D/g, ''))) {
        newErrors.email = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // This is a mock response - in a real app, this would be an actual API call
          if (isNgoLogin) {
            // For organization login, use the selected role
            resolve({
              success: true,
              user: {
                id: `org-${selectedRole}-123`,
                email: formData.email,
                name: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`,
                role: selectedRole,
                joinDate: '2023-01-15'
              },
              token: `mock-jwt-token-for-${selectedRole}`
            });
          } else {
            // For individual login, go directly to dashboard
            resolve({
              success: true,
              user: {
                id: 'user123',
                email: formData.email,
                name: 'John Doe',
                role: 'user',
                joinDate: '2023-05-20'
              },
              token: 'mock-jwt-token-for-user'
            });
          }
        }, 1500);
      });

      if (response.success) {
        // Save user data to context and localStorage
        login(response.user);
        
        // Redirect to the appropriate dashboard based on role
        const dashboardPath = isNgoLogin ? `/${selectedRole}/dashboard` : '/dashboard';
        navigate(dashboardPath);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        form: 'Failed to login. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality would be implemented here.');
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login would be implemented here.`);
  };

  // Role configuration
  const roles = [
    {
      id: 'ngo',
      label: 'NGO',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'regulatory',
      label: 'Regulatory',
      icon: <Gavel className="w-5 h-5" />
    },
    {
      id: 'buyer',
      label: 'Buyer',
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-teal-800">Carbonverse</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-700">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                loginMethod === 'email'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                loginMethod === 'phone'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>

          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p>{errors.form}</p>
            </div>
          )}
          
          {/* Login Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-col w-full max-w-md space-y-3">
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsNgoLogin(false)}
                  className={`px-8 py-2 rounded-md text-sm font-medium ${
                    !isNgoLogin
                      ? 'bg-white text-teal-800 shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Individual Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsNgoLogin(true)}
                  className={`px-8 py-2 rounded-md text-sm font-medium ${
                    isNgoLogin
                      ? 'bg-white text-teal-800 shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Organization Login
                </button>
              </div>
              
              {isNgoLogin && (
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                        selectedRole === role.id
                          ? 'bg-teal-100 text-teal-800 border border-teal-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {role.icon}
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                  className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } text-gray-900 placeholder-gray-500`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } text-gray-900 placeholder-gray-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-teal-700 hover:text-teal-800 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-teal-800 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isNgoLogin ? 'Signing in as NGO...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {isNgoLogin ? `Sign in as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Sign in to your account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
              
              <div className="text-center text-sm text-gray-600">
                {isNgoLogin ? (
                  <p className="inline-flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure Organisation portal - Your organization's data is protected
                  </p>
                ) : (
                  <p>Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => navigate('/signup')}
                      className="text-teal-700 font-medium hover:text-teal-800 hover:underline focus:outline-none"
                    >
                      Sign up
                    </button>
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('Microsoft')}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#00BCF2" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => window.location.href = '/signup'}
                className="text-teal-700 hover:text-teal-800 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-teal-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-teal-800 mb-1">Secure Login</h3>
              <p className="text-sm text-teal-700">
                Your data is protected with enterprise-grade security. All transactions are encrypted and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-teal-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
            <p className="text-sm text-gray-600">Bank-level security</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-teal-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Verified</h3>
            <p className="text-sm text-gray-600">MRV certified projects</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-teal-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Impact</h3>
            <p className="text-sm text-gray-600">Real environmental change</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
