import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className='py-12 md:py-16'>
            <div className='container'>
                <div className='bg-primary rounded-2xl overflow-hidden'>
                    <div className='grid md:grid-cols-2 items-center'>
                        <div className='p-8 md:p-12 lg:p-16'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4'>
                                Special Offer
                            </h2>
                            <p className='text-lg text-primary-foreground/90 mb-6 max-w-md'>
                                Sign up for our newsletter and get 10% off your
                                first order plus exclusive access to sales and
                                promotions.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    className='px-4 py-2 rounded-md border border-primary-foreground/20 bg-transparent text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30'
                                />
                                <Button className='bg-white text-primary hover:bg-white/90'>
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                        <div
                            className='h-full bg-cover bg-center bg-no-repeat hidden md:block'
                            style={{
                                backgroundImage:
                                    "url('https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                                minHeight: "300px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
