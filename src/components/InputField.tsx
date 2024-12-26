import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  errorMessage,
  showPasswordToggle = false,
}) => {
  return (
    <div className="relative w-full mb-4">
      <input
        type={showPasswordToggle ? 'text' : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full p-2 border rounded"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
