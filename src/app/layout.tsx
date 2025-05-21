import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import { ClientProviders } from "@/components/providers/client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BuyZone - Your One-Stop Online Shop",
    description:
        "Shop for the latest products at great prices. Fast shipping and easy returns.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`container mx-auto ${inter.className}`}>
                <ClientProviders>
                    <div className='flex min-h-screen flex-col'>
                        <Navbar />
                        <main className='flex-1'>{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </ClientProviders>
            </body>
        </html>
    );
}
