// Types Imports
import { InputComProps } from '@/types'

export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = 'text-gray-500 text-[13px] font-normal'
}: InputComProps) {
  return (
    <div className='input-com h-full w-full'>
      {label && (
        <label
          className={`input-label mb-2 block capitalize ${labelClasses || ''}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className='input-wrapper border-gray-500-border relative h-full w-full overflow-hidden border'>
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className={`input-field text-dark-gray h-full w-full bg-white px-6 text-sm font-normal placeholder:text-sm focus:outline-none focus:ring-0 ${
            inputClasses || ''
          }`}
          type={type}
          id={name}
        />
        {children && children}
      </div>
    </div>
  )
}
