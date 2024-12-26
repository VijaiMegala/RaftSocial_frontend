import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface PasswordToggleProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute top-5 right-3 transform -translate-y-1/2"
    >
      {showPassword ? (
        <FiEyeOff className="w-4 h-4 text-gray-500" />
      ) : (
        <FiEye className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );
};

export default PasswordToggle;
