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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type TLoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const redirectPath = searchParams.get("redirect") || "/account";

    const form = useForm<TLoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: TLoginFormValues) => {
        setIsLoading(true);

        try {
            const success = await login(data.email, data.password);

            if (success) router.push(redirectPath);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='container py-16 md:py-20'>
                <div className='mx-auto max-w-md space-y-6'>
                    <div className='space-y-2 text-center'>
                        <h1 className='text-3xl font-bold'>Welcome back</h1>
                        <p className='text-muted-foreground'>
                            Enter your email to sign in to your account
                        </p>
                    </div>

                    <div className='border rounded-lg p-6 md:p-8'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'>
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

                                <div className='text-right'>
                                    <Link
                                        href='#'
                                        className='text-sm text-muted-foreground hover:text-primary'>
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className='mt-6 text-center text-sm'>
                            Don't have an account?{" "}
                            <Link
                                href='/auth/register'
                                className='text-primary font-medium hover:text-primary/80'>
                                Sign up
                            </Link>
                        </div>
                    </div>

                    <div className='text-center text-xs text-muted-foreground'>
                        By signing in, you agree to our{" "}
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
        </>
    );
};

export default LoginPage;
