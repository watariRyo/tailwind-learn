import Link from 'next/link';

export default function SideBar() {
  return (
    <aside
      id='default-sidebar'
      className='fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          <li>
            <Link
              href='/dashboard'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
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
                className='lucide lucide-layout-dashboard'
              >
                <rect
                  width='7'
                  height='9'
                  x='3'
                  y='3'
                  rx='1'
                />
                <rect
                  width='7'
                  height='5'
                  x='14'
                  y='3'
                  rx='1'
                />
                <rect
                  width='7'
                  height='9'
                  x='14'
                  y='12'
                  rx='1'
                />
                <rect
                  width='7'
                  height='5'
                  x='3'
                  y='16'
                  rx='1'
                />
              </svg>
              <span className='ms-3'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href='/report'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
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
                className='lucide lucide-chart-spline'
              >
                <path d='M3 3v16a2 2 0 0 0 2 2h16' />
                <path d='M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7' />
              </svg>
              <span className='ms-3'>Report</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
