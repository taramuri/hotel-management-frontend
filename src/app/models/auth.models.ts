export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }