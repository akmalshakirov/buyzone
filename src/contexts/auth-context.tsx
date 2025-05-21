"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (
        name: string,
        email: string,
        password: string
    ) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const sampleUser: User = {
    id: "user-1",
    name: "John Doe",
    email: "user@example.com",
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { toast } = useToast();

    // Check for saved authentication on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Failed to parse saved user", error);
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // In a real app, this would call an API
            // For demo purposes, we'll accept any input with basic validation
            if (!email || !password) {
                toast({
                    title: "Login failed",
                    description: "Please enter both email and password",
                    variant: "destructive",
                });
                return false;
            }

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Use sample user
            setUser(sampleUser);
            localStorage.setItem("user", JSON.stringify(sampleUser));

            toast({
                title: "Login successful",
                description: `Welcome back, ${sampleUser.name}`,
            });

            return true;
        } catch (error) {
            console.error("Login error:", error);
            toast({
                title: "Login failed",
                description: "An error occurred during login",
                variant: "destructive",
            });
            return false;
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            // In a real app, this would call an API
            if (!name || !email || !password) {
                toast({
                    title: "Registration failed",
                    description: "Please fill in all fields",
                    variant: "destructive",
                });
                return false;
            }

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Create a new user
            const newUser = {
                id: `user-${Date.now()}`,
                name,
                email,
            };

            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));

            toast({
                title: "Registration successful",
                description: `Welcome, ${name}!`,
            });

            return true;
        } catch (error) {
            console.error("Registration error:", error);
            toast({
                title: "Registration failed",
                description: "An error occurred during registration",
                variant: "destructive",
            });
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast({
            title: "Logged out",
            description: "You have been logged out successfully",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
