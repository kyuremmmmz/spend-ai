
export interface AuthFormProps{
    showPassword: boolean;
    handleToggle: () => void;
    action: (formData: FormData) => void;
    mode: "login" | "signup";
    errorsLogin?: {
        email?: string[];
        password?: string[];
        name?: string[];

    },
    errorsSignup?: {
        email?: string[];
        name?: string[];
        password?: string[];
    },
    isLoading?: boolean;
}