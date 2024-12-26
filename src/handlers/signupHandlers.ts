import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutation';
import { notification } from 'antd';
import axios from 'axios';
import { validateSignup } from '../utils/validation';

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const preset = import.meta.env.VITE_UPLOAD_PRESET;

export const useSignupHandlers = (
  formData: { email: string; password: string; name: string; age: number; description: string },
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  setErrorMessages: React.Dispatch<React.SetStateAction<any>>,
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  image: string | null,
  loading: boolean,
  signup: any,
  errorMessages: { [key: string]: string },
  navigate: Function  // Accept navigate here
) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const newErrorMessages = { ...errorMessages };

    if (name === 'name' && !formData.name) {
      newErrorMessages[name] = 'Name is required.';
    } else if (name === 'email' && !formData.email) {
      newErrorMessages[name] = 'Please enter a valid email address.';
    } else if (name === 'password' && !formData.password) {
      newErrorMessages[name] = 'Password is required.';
    } else if (name === 'age' && formData.age < 18) {
      newErrorMessages[name] = 'Age must be at least 18.';
    } else {
      delete newErrorMessages[name];
    }

    setErrorMessages(newErrorMessages);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', `${preset}`);
      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        const imageUrl = response.data.url; 
        setImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        notification.error({
          message: 'Image Upload Failed',
          description: 'Failed to upload image. Please try again later.',
          placement: 'topRight',
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSignup(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    setErrorMessages({});

    try {
      await signup({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            age: formData.age,
            description: formData.description || '',
            profilePic: image || '',
          },
        },
      });

      notification.success({
        message: 'Signup Successful',
        description: 'Please verify your email to complete the signup process.',
        placement: 'topRight',
      });

      navigate('/dashboard');
    } catch (err: any) {
      notification.error({
        message: 'Signup Failed',
        description: err.message || 'Something went wrong. Please try again later.',
        placement: 'topRight',
      });
    }
  };

  return {
    handleInputChange,
    handleBlur,
    handleImageUpload,
    handleSubmit
  };
};
