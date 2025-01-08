'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import Image from 'next/image'

// * ASSETS IMPORTS
import { YoptopReviews } from '@/types'
import { Star } from 'lucide-react'
import { PlaceholderUser } from '@/assets'
import ReviewForm from '@/components/SingleProductPage/review-form'
import { User } from 'next-auth'
import VoteReview from './vote-review'

export default function Reviews({
  reviews,
  user,
  product
}: {
  reviews: YoptopReviews | undefined
  user: User | undefined
  product: { id: string; title: string; url: string }
}) {
  const [visibleReviews, setVisibleReviews] = React.useState(3)

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3)
  }

  return (
    <div className='reviews mb-10 w-full md:mb-14'>
      {/* comments */}
      <div className='comments mb-10 w-full md:mb-14'>
        {reviews && reviews.length > 0 ? (
          reviews
            .sort((a, b) => a.score + b.score)
            .slice(0, visibleReviews)
            .map(
              ({
                id,
                images_data,
                user,
                created_at,
                score,
                content,
                title,
                votes_up,
                votes_down
              }) => (
                <div key={id} className='mb-2.5 bg-white px-10 py-8'>
                  <div className='mb-3 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0'>
                    <div className='flex items-center space-x-3'>
                      <Image
                        src={images_data || PlaceholderUser}
                        alt={user.display_name}
                        placeholder='blur'
                        width={50}
                        height={50}
                        className='h-12 w-12 overflow-hidden rounded-full'
                      />
                      <div>
                        <p className='text-[18px] font-medium text-gray-900'>
                          {user.display_name}
                        </p>
                        <p className='text-[13px] font-normal text-gray-500'>
                          {new Date(created_at).toLocaleDateString('es-Es')}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-5'>
                      <div className='flex items-center gap-2'>
                        <div className='flex text-yellow-300'>
                          {Array(score)
                            .fill(`reviews-${user.display_name}`)
                            .map((star, index) => (
                              <Star
                                key={`${star}-${index}`}
                                className={
                                  index < score
                                    ? 'fill-yellow-300'
                                    : 'fill-white'
                                }
                                stroke='currentColor'
                              />
                            ))}
                        </div>
                        <span className='mt-1 inline-block text-[13px] font-normal text-gray-900'>
                          ({score}.0)
                        </span>
                      </div>
                      <VoteReview
                        reviewId={id}
                        votes_down={votes_down}
                        votes_up={votes_up}
                      />
                    </div>
                  </div>
                  <p className='text-normal mb-4 text-lg leading-7 text-accent'>
                    {title}
                  </p>
                  <p className='text-normal mb-8 text-sm leading-7 text-gray-500'>
                    {content}
                  </p>
                </div>
              )
            )
        ) : (
          <h3 className='w-full bg-white p-5 text-center text-xl'>
            Aun no tenemos reseñas de este Producto, Puedes colaborar con la
            tuya en el formulario a continuación
          </h3>
        )}
      </div>
      {/* load comments */}
      {reviews && visibleReviews < reviews.length && (
        <div className='flex w-full justify-center'>
          <button
            type='button'
            onClick={loadMoreReviews}
            className='hover-200 h-[50px] w-[300px] bg-accent text-sm font-medium text-white hover:text-gray-500'
          >
            Cargar Mas
          </button>
        </div>
      )}
      <ReviewForm
        product={{ id: product.id, title: product.title, url: product.url }}
        user={user}
      />
    </div>
  )
}
