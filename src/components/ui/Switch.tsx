import React from 'react'
import { Switch as HeadlessSwitch, Field, Label } from '@headlessui/react'
import { clsx } from 'clsx'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  color?: 'dark/zinc' | 'purple' | 'sky' | 'emerald'
  disabled?: boolean
  name?: string
  value?: string
  'aria-label'?: string
  className?: string
}

interface SwitchFieldProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export function Switch({
  checked,
  onChange,
  color = 'purple',
  disabled = false,
  name,
  value,
  'aria-label': ariaLabel,
  className,
  ...props
}: SwitchProps) {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={clsx(
        className,
        // Base styles
        'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Disabled styles
        disabled && 'cursor-not-allowed opacity-50',
        // Color variants
        color === 'purple' && [
          'bg-gray-200 data-[checked]:bg-purple-600 dark:bg-gray-700 dark:data-[checked]:bg-purple-500',
          'focus:ring-purple-500 dark:focus:ring-purple-400',
        ],
        color === 'sky' && [
          'bg-gray-200 data-[checked]:bg-sky-600 dark:bg-gray-700 dark:data-[checked]:bg-sky-500',
          'focus:ring-sky-500 dark:focus:ring-sky-400',
        ],
        color === 'emerald' && [
          'bg-gray-200 data-[checked]:bg-emerald-600 dark:bg-gray-700 dark:data-[checked]:bg-emerald-500',
          'focus:ring-emerald-500 dark:focus:ring-emerald-400',
        ],
        color === 'dark/zinc' && [
          'bg-gray-200 data-[checked]:bg-gray-900 dark:bg-gray-700 dark:data-[checked]:bg-gray-100',
          'focus:ring-gray-500 dark:focus:ring-gray-300',
        ]
      )}
      {...props}
    >
      <span
        className={clsx(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
          'translate-x-0 group-data-[checked]:translate-x-5'
        )}
      />
    </HeadlessSwitch>
  )
}

export function SwitchField({ children, disabled = false, className }: SwitchFieldProps) {
  return (
    <Field
      disabled={disabled}
      className={clsx(
        className,
        'flex items-center justify-between',
        disabled && 'opacity-50'
      )}
    >
      {children}
    </Field>
  )
}

export { Label as SwitchLabel } from '@headlessui/react' 