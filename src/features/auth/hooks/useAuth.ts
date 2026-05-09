import { useCallback, useState } from "react";

export default function useAuthState() {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleToggle = useCallback(() => {
        setShowPassword(!showPassword)
    },[showPassword])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { fullName, email, password });
    };

  return {
    showPassword,
    setShowPassword,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleToggle
  };
}