"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema
const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Form submission handler
    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);

        try {
            const success = await register(
                data.name,
                data.email,
                data.password
            );

            if (success) {
                router.push("/account");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container py-16 md:py-20'>
            <div className='mx-auto max-w-md space-y-6'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold'>Create an account</h1>
                    <p className='text-muted-foreground'>
                        Enter your information to create an account
                    </p>
                </div>

                <div className='border rounded-lg p-6 md:p-8'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='John Doe'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='email@example.com'
                                                type='email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='••••••••'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='••••••••'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className='mt-6 text-center text-sm'>
                        Already have an account?{" "}
                        <Link
                            href='/auth/login'
                            className='text-primary font-medium hover:text-primary/80'>
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className='text-center text-xs text-muted-foreground'>
                    By creating an account, you agree to our{" "}
                    <Link
                        href='#'
                        className='underline underline-offset-4 hover:text-primary'>
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href='#'
                        className='underline underline-offset-4 hover:text-primary'>
                        Privacy Policy
                    </Link>
                    .
                </div>
            </div>
        </div>
    );
}
