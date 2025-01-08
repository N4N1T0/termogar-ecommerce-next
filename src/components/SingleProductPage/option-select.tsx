import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const OptionSelect = ({
  options,
  defaultValue,
  setType
}: {
  options: {
    name?: string
    values?: Array<string>
  }
  defaultValue?: string | null | undefined
  setType: (e: string) => void
}) => {
  return (
    <div data-aos='fade-up' className='product-size'>
      {!defaultValue && (
        <span className='mb-3 inline-block text-sm font-normal uppercase text-gray-500'>
          {options.name}
        </span>
      )}
      <Select onValueChange={(e) => setType(e)}>
        <SelectTrigger className='w-full rounded-none'>
          <SelectValue placeholder={defaultValue || options.name} />
        </SelectTrigger>
        <SelectContent className='rounded-none bg-white'>
          {options.values?.map((item) => (
            <SelectItem
              value={item}
              key={item}
              className='rounded-none uppercase'
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default OptionSelect
