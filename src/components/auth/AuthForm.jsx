import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';

export default function AuthForm({ mode = 'login', onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login, signup } = useAuth();
  const { showToast } = useToast();
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Username validation for signup
    if (mode === 'signup') {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation for signup
    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/login' : '/api/register';
      const response = await axios.post(`http://127.0.0.1:5000${endpoint}`, {
        email: formData.email,
        password: formData.password,
        ...(mode === 'signup' && { username: formData.username })
      });

      const { user, token } = response.data;
      
      if (mode === 'login') {
        await login(user, token);
        showToast('Welcome back!', 'success');
        if (onSuccess) {
          onSuccess('Login successful!');
        }
      } else {
        await signup(user, token);
        showToast('Account created successfully! Welcome to Trackr.', 'success');
        const message = 'Account created successfully! You are now logged in.';
        setSuccessMessage(message);
        if (onSuccess) {
          onSuccess(message);
        }
      }
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      });
    } catch (error) {
      setApiError(
        error.response?.data?.message || 
        `An error occurred during ${mode}. Please try again.`
      );
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-sm mx-auto px-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.username ? 'border-red-300' : 'border-gray-300'
              } text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
        )}
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            } text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            } text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {mode === 'signup' && (
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {apiError}
                </h3>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {successMessage}
                </h3>
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}