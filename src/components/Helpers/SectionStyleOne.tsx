'use client'

import { useState } from 'react'
import CategoryCard from './Cards/CategoryCard'
import ProductCardStyleOne from './Cards/ProductCardStyleOne'
import DataIteration from './DataIteration'
import ViewMoreTitle from './ViewMoreTitle'
import { ProductTypes, SectionStyleOneProps } from '@/types'

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  brands = [],
  products = [],
  categoryBackground
}: SectionStyleOneProps) {
  const filterBrands = brands.filter(
    (value, index, array) => array.indexOf(value) === index
  )
  const [productLength] = useState(3)

  // TODO: Prepare for Sanity and Array

  return (
    <div data-aos='fade-up' className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className='products-section w-full'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
            <div className='category-card hidden w-full xl:block'>
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                brands={filterBrands}
              />
            </div>
            <DataIteration
              datas={products}
              startLength={0}
              endLength={productLength}
            >
              {({ datas }: { datas: ProductTypes }) => (
                <div key={datas.id} className='item'>
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
