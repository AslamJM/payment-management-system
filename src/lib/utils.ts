import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, differenceInDays } from 'date-fns'
import { formatSLR } from 'sl-currency-formatter'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return format(date, "PPP")
}

export function daysSince(date: Date) {
  return differenceInDays(date, new Date(),)
}

export function rupees(amount: number) {
  return formatSLR(amount, { prefix: false })
}