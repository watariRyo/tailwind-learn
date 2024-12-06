import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function IndexPage() {
    return (
    <>
        <section className='pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12'>
            <div className='container text-center flex flex-col items-center gap-4'>
                <h1 className='font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    Household
                </h1>
                <p className='text-muted-foreground sm:text-xl leading-normal max-w-[42rem]'>
                    Do explain this page.
                </p>
                <div className='space-x-4'>
                <Link
                    href={'/login'}
                    className={cn(buttonVariants({ size: 'lg' }))}
                >
                    はじめる
                </Link>
                <Link
                    href={siteConfig.links.github}
                    className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
                    target='_blank'
                    rel='noreferrer' // 参照元を隠す
                >
                    Github
                </Link>
                </div>
            </div>
        </section>
        <section
        id='features'
        className='container py-8 md:py-12 lg:py-24 bg-slate-50 space-y-6'
        >
            <div className='text-center space-y-6 max-w[58rem] mx-auto'>
                <h2 className='font-extrabold text-3xl md:text-6xl'>
                Content Topic Something
                </h2>
                <p className='text-muted-foreground sm:text-lg sm:leading-7'>
                Content Something
                </p>
            </div>
            <div className='mx-auto md:max-w-[58rem] text-center'>
                <p className='text-muted-foreground sm:text-lg sm:leading-7'>
                    Sub Content Something
                </p>
            </div>
        </section>
        <section id='contact' className='container py-8 md:py-12 lg:py-24'>
            <div className='max-w-[58rem] mx-auto text-cente flex flex-col gap-4'>
                <h2 className='font-extrabold text-3xl md:text-6xl'>Contact Me</h2>
                <p className='text-muted-foreground sm:text-lg sm:leading-7'>
                    Something Message
                </p>
            </div>
        </section>
    </>
    );
}