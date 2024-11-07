import { useState } from 'react'
import InputCom from '../../Helpers/InputCom'
import LoaderStyleOne from '../../Helpers/Loaders/LoaderStyleOne'

export default function CommentBlog() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [reviewLoading, setLoading] = useState(false)
  const [commnets, setComments] = useState([
    {
      id: Math.random(),
      author: 'Rafiqul Islam',
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 4,
      replys: [
        {
          id: Math.random(),
          name: 'Willium Kingson',
          comments: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        }
      ]
    },
    {
      id: Math.random(),
      author: 'Abdullah Mamun',
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 5
    }
  ])
  const reviewAction = () => {
    setLoading(true)
    setTimeout(() => {
      if ((name, message)) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message
          },
          ...prev
        ])
        setLoading(false)
        setName('')
        setEmail('')
        setMessage('')
      }
      setLoading(false)
      return false
    }, 2000)
  }
  return (
    <>
      <div className='write-review mb-[30px] w-full'>
        <h1 className='text-qblack mb-5 text-2xl font-medium'>
          Leave a Comment
        </h1>
        <div className='review-form w-full'>
          <div className='mb-5 w-full items-center sm:flex sm:space-x-[30px]'>
            <div className='mb-5 w-full sm:mb-0'>
              <InputCom
                label='name*'
                placeholder=''
                type='text'
                name='name'
                inputClasses='h-[50px]'
                value={name}
                inputHandler={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <InputCom
                label='Email*'
                placeholder=''
                type='email'
                name='name'
                inputClasses='h-[50px]'
                value={email}
                inputHandler={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='mb-[30px] w-full'>
            <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
              Message*
            </h6>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
      <div className='comments w-full'>
        <h1 className='text-qblack mb-5 text-2xl font-medium'>Comments</h1>
        {commnets &&
          commnets.length > 0 &&
          commnets.map((comment) => (
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
    </>
  )
}
