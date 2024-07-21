import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, differenceInDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return format(date, "PPP")
}

export function daysSince(date: Date) {
  return differenceInDays(new Date(), date,)
}