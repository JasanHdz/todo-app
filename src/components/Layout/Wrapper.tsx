import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  isEmptyPadding?: boolean
}


function Wrapper({ children, className, isEmptyPadding }: Props) {
  return (
    <div className={`${className} mx-auto ${isEmptyPadding ? '' : 'px-4 py-2 lg:px-20 sm:py-4'}`}>{children}</div>
  )
}

export default Wrapper