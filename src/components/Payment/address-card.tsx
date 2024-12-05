import { Address } from '@/types/sanity'

const AddressDisplay = ({
  address,
  title
}: {
  address:
    | ({
        _key: string
      } & Address)
    | null
    | undefined
  title: string
}) => {
  return (
    <article className='border-px w-full space-y-3 border border-gray-200 p-4'>
      <h4 className='border-px w-fit border-b border-gray-500 font-semibold uppercase'>
        {title}
      </h4>
      <div className='space-y-1'>
        {address?.firstName && (
          <p className='font-medium'>{address?.firstName}</p>
        )}
        {address?.address1 && <p>{address?.address1}</p>}
        {address?.address2 && <p>{address?.address2}</p>}
        <p>
          {address?.city && `${address?.city}, `}
          {address?.state && `${address?.state} `}
          {address?.postcode}
        </p>
        {address?.email && <p>{address?.email}</p>}
        {address?.phone && <p>{address?.phone}</p>}
      </div>
    </article>
  )
}

export default AddressDisplay
