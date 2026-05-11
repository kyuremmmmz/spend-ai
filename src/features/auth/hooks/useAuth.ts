'use client';
import { useActionState,  useCallback,  useState } from "react";
import { signIn, signUp } from "../actions/authentication";


const initialState = {
    errors: {}
}
export default function useAuthState() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginState, loginAction, loginLoading] = useActionState(signIn,initialState);
    const [signupState, signupAction, signupLoading] = useActionState(signUp,initialState);


    const handleToggle = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);


  return {
    showPassword,
    setShowPassword,
    loginState,
    loginAction,
    loginLoading,
    signupState,
    signupAction,
    signupLoading,
    handleToggle
  };
}