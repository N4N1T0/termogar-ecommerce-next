import Star from '../Helpers/icons/Star'
import InputCom from '../Helpers/InputCom'
import LoaderStyleOne from '../Helpers/Loaders/LoaderStyleOne'
import StarRating from '../Helpers/StarRating'

export default function Reviews({
  comments,
  rating,
  ratingHandler,
  name,
  nameHandler,
  email,
  emailHandler,
  phone,
  phoneHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading
}) {
  return (
    <div className='review-wrapper w-full'>
      <div className='reviews mb-[60px] w-full'>
        {/* comments */}
        <div className='comments mb-[60px] w-full'>
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <div
                key={comment.id}
                className='comment-item mb-2.5 bg-white px-10 py-[32px]'
              >
                <div className='comment-author mb-3 flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-[50px] w-[50px] overflow-hidden rounded-full'>
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_URL
                        }/assets/images/comment-user-1.png`}
                        alt=''
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div>
                      <p className='text-qblack text-[18px] font-medium'>
                        {comment.author}
                      </p>
                      <p className='text-[13px] font-normal text-gray-500'>
                        London,UK
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='flex'>
                      {Array.from(Array(comment.review), () => (
                        <span key={comment.review + Math.random()}>
                          <Star />
                        </span>
                      ))}
                    </div>
                    <span className='text-qblack mt-1 inline-block text-[13px] font-normal'>
                      ({comment.review}.0)
                    </span>
                  </div>
                </div>
                <div className='comment mb-[30px]'>
                  <p className='text-normal text-[15px] leading-7 text-gray-500'>
                    {comment.comments}
                  </p>
                </div>
                {comment.replys &&
                  comment.replys.length > 0 &&
                  comment.replys.map((reply) => (
                    <div
                      key={reply.id}
                      className='sub-comment-item border-t bg-white px-10 pt-[32px]'
                    >
                      <div className='comment-author mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div className='h-[50px] w-[50px] overflow-hidden rounded-full'>
                            <img
                              src={`${
                                process.env.NEXT_PUBLIC_URL
                              }/assets/images/comment-user-2.png`}
                              alt=''
                              className='h-full w-full object-cover'
                            />
                          </div>
                          <div>
                            <p className='text-qblack text-[18px] font-medium'>
                              {reply.author}
                            </p>
                            <p className='text-[13px] font-normal text-gray-500'>
                              London,UK
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='comment mb-[30px]'>
                        <p className='text-normal text-[15px] leading-7 text-gray-500'>
                          {reply.comments}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
        {/* load comments */}
        <div className='flex w-full justify-center'>
          <button
            type='button'
            className='black-btn h-[50px] w-[300px] text-sm font-semibold'
          >
            Load More
          </button>
        </div>
      </div>
      <div className='write-review w-full'>
        <h1 className='text-qblack mb-5 text-2xl font-medium'>
          Write Your Reviews
        </h1>

        <div className='mb-[30px] flex items-center space-x-1'>
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className='text-qblack mt-1 text-[15px] font-normal'>
            ({rating}.0)
          </span>
        </div>

        <div className='review-form w-full'>
          <div className='mb-5 items-center sm:flex sm:space-x-[30px]'>
            <div className='w-full sm:w-1/3'>
              <InputCom
                label='name*'
                placeholder=''
                type='text'
                name='name'
                inputClasses='h-[50px]'
                value={name}
                inputHandler={nameHandler}
              />
            </div>
            <div className='mt-5 w-full sm:mt-0 sm:w-1/3'>
              <InputCom
                label='Email*'
                placeholder=''
                type='email'
                name='name'
                inputClasses='h-[50px]'
                value={email}
                inputHandler={emailHandler}
              />
            </div>
            <div className='mt-5 w-full sm:mt-0 sm:w-1/3'>
              <InputCom
                label='Phone Number*'
                placeholder=''
                type='text'
                name='name'
                inputClasses='h-[50px]'
                value={phone}
                inputHandler={phoneHandler}
              />
            </div>
          </div>
          <div className='mb-[30px] w-full'>
            <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
              Message*
            </h6>
            <textarea
              value={message}
              onChange={messageHandler}
              name=''
              id=''
              cols='30'
              rows='3'
              className='w-full p-6 focus:outline-none focus:ring-0'
            ></textarea>
          </div>

          <div className='flex justify-end'>
            <button
              onClick={reviewAction}
              type='button'
              className='black-btn flex h-[50px] w-[300px] justify-center'
            >
              <span className='flex h-full items-center space-x-1'>
                <span className='text-sm font-semibold'>Submit Review</span>
                {reviewLoading && (
                  <span className='w-5' style={{ transform: 'scale(0.3)' }}>
                    <LoaderStyleOne />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
