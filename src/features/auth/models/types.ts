export type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
  };

  user?: {
    id: string;
    name: string;
  };

  session?: string;
};


export type SignUpState = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
  };

  user?: {
    id: string;
    name: string;
    email: string;
    
  };

  session?: string | null;
};