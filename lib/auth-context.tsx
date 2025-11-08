// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useSession, signIn, signOut } from "next-auth/react";
// import toast from "react-hot-toast";

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: 'admin' | 'merchant' | 'franchise' | 'it' | 'user';
//   provider?: 'credentials' | 'google';
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string, role?: string) => Promise<boolean>;
//   logout: () => void;
//   register: (email: string, password: string, name: string, role?: string) => Promise<boolean>;
//   loginWithGoogle: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [localUser, setLocalUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // 👇 NextAuth session (Google etc.)
//   const { data: session, status } = useSession();

//   // Load saved user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem('citywitty_user');
//     if (storedUser) setLocalUser(JSON.parse(storedUser));
//     setIsLoading(false);
//   }, []);

//   // Merge: Prefer NextAuth session user > fallback to localUser
//   const user: User | null = session?.user
//     ? {
//       id: (session.user as any).id || '',
//       email: session.user.email || '',
//       name: session.user.name || '',
//       role: (session.user as any).role || 'user',
//       provider: (session.user as any).provider || 'google',
//     }
//     : localUser;

//   // ------------------
//   // Manual login
//   // ------------------
//   const login = async (email: string, password: string, role: string = 'user'): Promise<boolean> => {
//     try {
//       setIsLoading(true);

//       const res = await fetch('/api/user-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, role, provider: "credentials" })
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Login failed");
//         return false;
//       }

//       const loggedInUser: User = {
//         id: data._id,
//         email: data.email,
//         name: data.username,
//         role: data.role,
//         provider: data.provider || "credentials"
//       };

//       setLocalUser(loggedInUser);
//       localStorage.setItem('citywitty_user', JSON.stringify(loggedInUser));

//       toast.success("Login successful!");
//       return true;
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error("Something went wrong during login.");
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ------------------
//   // Logout
//   // ------------------
//   const logout = () => {
//     setLocalUser(null);
//     localStorage.removeItem('citywitty_user');
//     signOut(); // logout NextAuth
//     toast.success("Logged out successfully.");
//   };

//   // ------------------
//   // Register
//   // ------------------
//   const register = async (
//     email: string,
//     password: string,
//     name: string,
//     role: string = 'user'
//   ): Promise<boolean> => {
//     try {
//       setIsLoading(true);

//       const res = await fetch('/api/user-register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, name, role, provider: "credentials" })
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || "Registration failed");
//         return false;
//       }

//       const newUser: User = {
//         id: data.user?._id || '',
//         email,
//         name,
//         role: role as User['role'],
//         provider: "credentials"
//       };

//       setLocalUser(newUser);
//       localStorage.setItem('citywitty_user', JSON.stringify(newUser));

//       toast.success("Registration successful!");
//       return true;
//     } catch (err) {
//       console.error('Register error:', err);
//       toast.error("Something went wrong during registration.");
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ------------------
//   // Google Login
//   // ------------------
//   const loginWithGoogle = () => {
//     toast("Redirecting to Google login...");
//     signIn("google");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register, loginWithGoogle, isLoading }}>
//       {status === "loading" || isLoading ? (
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
//         </div>
//       ) : (
//         children
//       )}
//     </AuthContext.Provider>
//   );
// }

// // ------------------
// // Custom Hook
// // ------------------
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// }

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'merchant' | 'franchise' | 'it' | 'user';
  provider?: 'credentials' | 'google';
  isCardExist?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role?: string) => Promise<boolean>;
  loginWithGoogle: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // NextAuth session (Google etc.)
  const { data: session, status } = useSession();

  // Show toast when Google login succeeds
  useEffect(() => {
    if (status === "authenticated" && session?.user && !localUser) {
      toast.success(`Welcome back, ${session.user.name || 'User'}! 🎉`);
    }
  }, [status, session, localUser]);

  // Load saved user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('citywitty_user');
    if (storedUser) setLocalUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  // Merge: Prefer NextAuth session user > fallback to localUser
  const user: User | null = session?.user
    ? {
      id: (session.user as any).id || '',
      email: session.user.email || '',
      name: session.user.name || '',
      role: (session.user as any).role || 'user',
      provider: (session.user as any).provider || 'google',
      isCardExist: (session.user as any).isCardExist || false,
    }
    : localUser;

  // ------------------
  // Manual login
  // ------------------
  const login = async (email: string, password: string, role: string = 'user'): Promise<boolean> => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, provider: "credentials" })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return false;
      }

      if (data.provider && data.provider !== "credentials") {
        toast.error(`This account uses ${data.provider} login. Please sign in with ${data.provider === "google" ? "Google" : "the correct"} method.`);
        return false;
      }

      const loggedInUser: User = {
        id: data._id,
        email: data.email,
        name: data.username,
        role: data.role,
        provider: data.provider || "credentials",
        isCardExist: data.isCardExist
      };

      setLocalUser(loggedInUser);
      localStorage.setItem('citywitty_user', JSON.stringify(loggedInUser));

      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Something went wrong during login.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------
  // Logout
  // ------------------
  const logout = () => {
    setLocalUser(null);
    localStorage.removeItem('citywitty_user');
    signOut({ callbackUrl: "/" }); // force redirect
    toast.success("Logged out successfully.");
  };

  // ------------------
  // Register
  // ------------------
  const register = async (
    email: string,
    password: string,
    name: string,
    role: string = 'user'
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/user-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role, provider: "credentials" })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        return false;
      }

      const newUser: User = {
        id: data.user?._id || '',
        email,
        name,
        role: role as User['role'],
        provider: "credentials",
        isCardExist: data.user?.isCardExist || false
      };

      setLocalUser(newUser);
      localStorage.setItem('citywitty_user', JSON.stringify(newUser));

      toast.success("Profile created successfully! 🎉");
      return true;
    } catch (err) {
      console.error('Register error:', err);
      toast.error("Something went wrong during registration.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------
  // Google Login
  // ------------------
  const loginWithGoogle = () => {
    toast("Redirecting to Google login...");
    signIn("google");
  };

  // ------------------
  // Validate session with DB
  // ------------------
  // ------------------
  // Validate session OR manual login with DB
  // ------------------
  useEffect(() => {
    const emailToCheck = session?.user?.email || localUser?.email;

    if (emailToCheck) {
      fetch("/api/user-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToCheck })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.exists) {
            logout();
            toast.error("Your account no longer exists.");
          }
        })
        .catch(err => {
          console.error("User validation failed", err);
        });
    }
  }, [session, localUser]);


  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginWithGoogle, isLoading }}>
      {status === "loading" || isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// ------------------
// Custom Hook
// ------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
