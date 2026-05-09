'use client';
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, Auth, authLogin, AuthLogin } from "../models/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useAuthState() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Auth>({
        resolver: zodResolver(auth)
    })

    const login = useForm<AuthLogin>({
        resolver: zodResolver(authLogin)
    })


    const handleToggle = useCallback(() => {
        setShowPassword(!showPassword)
    },[showPassword])

    const onSubmit = (data: Auth) => {
        console.log('Form submitted:', data);
    };

    const onSubmitLogin = (data: AuthLogin) => {
        console.log('Form submitted:', data);
    };

  return {
    showPassword,
    setShowPassword,
    handleSubmit,
    onSubmit,
    onSubmitLogin,
    handleToggle,
    register,
      errors,
    login
  };
}