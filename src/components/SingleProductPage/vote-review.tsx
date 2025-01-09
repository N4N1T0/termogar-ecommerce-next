import rateReview from '@/actions/rate-review'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import Form from 'next/form'
import { FormEvent } from 'react'
import { toast } from 'sonner'

const VoteReview = ({
  votes_up,
  votes_down,
  reviewId
}: {
  votes_up: number
  votes_down: number
  reviewId: number
}) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const vote = formData.get('vote')

    const values = {
      reviewId: reviewId.toString(),
      voteType: vote as 'up' | 'down'
    }

    const response = await rateReview(values)

    if (!response.success) {
      toast.error(response.message, {
        duration: 4000
      })
    } else {
      toast.success(response.message, {
        duration: 4000
      })
    }
  }

  return (
    <div className='flex items-center justify-center gap-2 text-secondary'>
      <Form onSubmit={handleSubmit} action='' scroll={false}>
        <input type='hidden' value='up' name='vote' />
        <button
          type='submit'
          className='flex items-center justify-center gap-2'
        >
          <ThumbsUp size={18} /> {votes_up}
        </button>
      </Form>
      <Form
        onSubmit={handleSubmit}
        action=''
        scroll={false}
        className='flex gap-2 text-secondary'
      >
        <input type='hidden' value='down' name='vote' />
        <button
          type='submit'
          className='flex items-center justify-center gap-2'
        >
          <ThumbsDown size={18} /> {votes_down}
        </button>
      </Form>
    </div>
  )
}

export default VoteReview
