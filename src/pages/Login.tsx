import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutation';
import { notification } from 'antd';
import InputField from '../components/InputField';
import PasswordToggle from '../components/PasswordToggle';
import { validateEmail, validatePassword } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [login, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { setUserId } = useUserContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const newErrorMessages = { ...errorMessages };
    if (name === 'email') {
      const emailError = validateEmail(formData.email);
      emailError ? (newErrorMessages[name] = emailError) : delete newErrorMessages[name];
    } else if (name === 'password') {
      const passwordError = validatePassword(formData.password);
      passwordError ? (newErrorMessages[name] = passwordError) : delete newErrorMessages[name];
    }

    setErrorMessages(newErrorMessages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    const emailError = validateEmail(formData.email);
    if (emailError) validationErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) validationErrors.password = passwordError;

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    setErrorMessages({});

    try {
        const { data } = await login({
            variables: {
              email: formData.email,
              password: formData.password,
            },
          });
          ;
        // console.log(data?.login?.user?.id)
      setUserId(data?.login?.user?.id);
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
        placement: 'topRight',
      });
      navigate('/followers');
    } catch (err: any) {
      notification.error({
        message: 'Login Failed',
        description: err.message || 'Something went wrong. Please try again later.',
        placement: 'topRight',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-full max-w-sm rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          errorMessage={errorMessages.email}
        />
        
        <div className="relative">
          <InputField
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errorMessage={errorMessages.password}
          />
          <PasswordToggle showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
