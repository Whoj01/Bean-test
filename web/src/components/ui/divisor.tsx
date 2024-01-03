import { cn } from "@/lib/utils"

interface DivisorProps {
  className?: string
}

export const Divisor = ({ className }: DivisorProps) => {
  return (
    <div className={cn(`flex items-center w-full h-[1px] gap-3`, className)} />
  )
}