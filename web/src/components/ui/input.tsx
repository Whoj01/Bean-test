import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  Element?: React.ReactElement
  helperText?: string
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Element, error, helperText, label, ...props }, ref) => {
    const inputId = React.useId()

    return (
      <div className="grid  w-full">
        <label htmlFor={inputId} className="font-inter font-normal text-black-500 text-sm mb-2">
          {label}
        </label>

        <div data-error={error} className="flex justify-center h-10 gap-3 px-2 w-full border border-input ring-2 ring-black-500/0 focus-within:ring-blue-400 data-[error=true]:ring-red-500 rounded-md items-center transition-all">
          {Element}

          <input
            id={inputId}
            type={type}
            className={cn(
              "peer flex h-9 w-full rounded-md bg-background text-sm outline-none file:border-0 border-0 ring-0 focus-visible:border-0 focus-visib:lering-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />

          {props.itemType}
        </div>

        {helperText && (
          <small className="font-inter font-light text-redpoke text-sm">
            {helperText}
          </small>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }