import React from 'react'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string
  hasError?: boolean
  hintText?: string
}

function Input({ onChange, value, label, id, name, hasError, hintText, className, ...otherProps }: Props) {
  return (
    <div className='flex flex-col'>
      {label && <label htmlFor={id ?? name} className="mb-3 text-sm font-medium text-gray-700 cursor-pointer">{label}</label>}
      <input {...otherProps} id={id ?? name} name={name} onChange={onChange} value={value} className={`${className} bg-gray-50 border ${hasError ? 'border-red-500' : ''} border-gray-200 rounded-md py-2 px-3 focus:${hasError ? 'border-red-500' : 'border-blue-500'} focus:bg-white focus:outline-none focus:ring-blue-500`} />
      {!!hintText?.length && <span className='text-red-500 p-1' style={{ fontSize: 9 }}>{hintText}</span>}
    </div>
  )
}

export default Input