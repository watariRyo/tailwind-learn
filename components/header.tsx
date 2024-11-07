import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Header() {
  return (
    <div className='w-full bg-sky-50 h-12 sm:ml-48 flex'>
      <div className='sm:hidden pl-4 pr-2 flex justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-menu'
            >
              <line
                x1='4'
                x2='20'
                y1='12'
                y2='12'
              />
              <line
                x1='4'
                x2='20'
                y1='6'
                y2='6'
              />
              <line
                x1='4'
                x2='20'
                y1='18'
                y2='18'
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuItem asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/report'>Report</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className='sm:pl-4 font-extrabold flex flex-col justify-center'>
        Household
      </h3>
    </div>
  );
}
