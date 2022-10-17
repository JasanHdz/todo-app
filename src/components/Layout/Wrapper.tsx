import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}


function Wrapper({ children, className }: Props) {
  return (
    <div className={`${className} mx-auto px-4 py-2 lg:px-20 sm:py-4`}>{children}</div>
  )
}

export default Wrapper