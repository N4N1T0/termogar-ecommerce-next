import { CategoryCardProps } from '@/types'
import Link from 'next/link'

const CategoryCard = ({ childrenCategories = [] }: CategoryCardProps) => {
  return (
    <div className='category-card-wrappwer h-full w-full p-[30px]'>
      <div>
        <div className='brands-list mb-[7px]'>
          <ul>
            {childrenCategories.map((brand) => (
              <li key={brand + Math.random()}>
                <Link href='/all-products'>
                  <span className='hover:text-qBlack hover:border-qblack hover:text-qblack border-b border-transparent text-sm capitalize text-gray-500'>
                    {brand}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <a href='#'>
          <div className='flex items-center space-x-2'>
            <span className='text-qblack font-600 text-sm'>Shop Now</span>
            <span>
              <svg
                width='7'
                height='11'
                viewBox='0 0 7 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='2.08984'
                  y='0.636719'
                  width='6.94219'
                  height='1.54271'
                  transform='rotate(45 2.08984 0.636719)'
                  fill='#1D1D1D'
                />
                <rect
                  x='7'
                  y='5.54492'
                  width='6.94219'
                  height='1.54271'
                  transform='rotate(135 7 5.54492)'
                  fill='#1D1D1D'
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default CategoryCard
