export const validateAge = (age: number): string | null => {
    if (age <= 18) {
      return 'Age must be above 18.';
    }
    return null;
  };
  
  export const validateName = (name: string): string | null => {
    if (name.length < 5) {
      return 'Name must contain at least 5 letters.';
    }
    return null;
  };
  
  export const validateEmail = (email: string): string | null => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordPattern.test(password)) {
      return 'Password must be between 8-16 characters, with at least one uppercase letter, one number, and one special character.';
    }
    return null;
  };
  
  export const validateSignup = (formData: { email: string; password: string; name: string; age: number }) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData.name) {
      errors.name = 'Name is required.';
    }
  
    if (!formData.email) {
      errors.email = 'Please enter a valid email address.';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required.';
    }
  
    if (formData.age < 18) {
      errors.age = 'Age must be at least 18.';
    }
  
    return errors; // Return an object
  };
  
  