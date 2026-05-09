import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface AuthFormProps{
    showPassword: boolean;
    handleToggle: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    register: UseFormRegister<{
        fullname?: string;
        email: string;
        password: string;
    }>;
    errors: FieldErrors<{
    fullname?: string;
    email?: string;
    password?: string;}>
}