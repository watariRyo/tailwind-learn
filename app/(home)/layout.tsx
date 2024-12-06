import SideBar from '@/components/side-menu';
import Header from '@/components/header';


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='container w-full sm:ml-48'>
        <SideBar />
        <Header />
        <div className='p-4'>{children}</div>
    </div>
  );
}
