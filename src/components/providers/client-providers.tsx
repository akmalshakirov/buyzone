"use client";

import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>{children}</CartProvider>
        </AuthProvider>
    );
}
