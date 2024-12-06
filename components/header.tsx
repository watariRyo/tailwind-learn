import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button, buttonVariants } from './ui/button'
import { signOut } from '@/lib/auth'

export default function Header() {
  const logout = async() => {
    await signOut()
  }

  return (
    <div className="container bg-sky-50 h-12 flex sm:justify-between sm:ml-0">
      <div className="sm:hidden pl-4 pr-2 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 ml-4'>
            <DropdownMenuItem asChild>
              <Link href='/dashboard' className='hover:bg-slate-100'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/report' className='hover:bg-slate-100'>Report</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <Button variant='secondary' className='w-full' type='submit'>Logout</Button>
            </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='sm:pl-4 flex flex-col justify-center invisible sm:visible'>
        <div className='font-extrabold'>Household</div>
      </div>
      <div className='lex flex-col justify-center mr-4 invisible sm:visible'>
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button variant='ghost' className='font-bold' type='submit'>Logout</Button>
        </form>
      </div>
    </div>
  )
}
