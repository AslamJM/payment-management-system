export type FilterProps = {
    getvalue: <R>(key: string) => R | null
    setValue: (key: string, value: string | number | boolean | object) => void
}

export const dateRanges = [
    "today",
    "last 7 days",
    "last 15 days",
    "last 30 days",
    "last month",
    "this year",
];

export const PAYMENT_STATUS = ["PAID", "DUE", "CANCELLED"];