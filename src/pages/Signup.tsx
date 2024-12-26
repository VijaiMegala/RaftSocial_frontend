import React, { useState } from 'react';
import { useSignupHandlers } from '../handlers/signupHandlers';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutation';
import ProfilePicUpload from '../components/ProfilePicUpload';
import InputField from '../components/InputField';
import PasswordToggle from '../components/PasswordToggle';
import 'antd/dist/reset.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', age: 18, description: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [image, setImage] = useState<string | null>(null);
  const [signup, { loading }] = useMutation(SIGNUP);

  const {
    handleInputChange,
    handleBlur,
    handleImageUpload,
    handleSubmit
  } = useSignupHandlers(formData, setFormData, setErrorMessages, setImage, image, loading, signup, errorMessages);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-full max-w-md rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <ProfilePicUpload image={image} handleImageUpload={handleImageUpload} />
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          errorMessage={errorMessages.name}
        />
        <InputField
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          onBlur={handleBlur}
          errorMessage={errorMessages.age}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          errorMessage={errorMessages.email}
        />
        <div className="relative mb-4 flex">
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errorMessage={errorMessages.password}
            showPasswordToggle={true}
          />
          <PasswordToggle
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        <InputField
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
