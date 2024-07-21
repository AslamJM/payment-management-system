import { create } from 'zustand'
import { PaymentQueryWhere } from '~/schemas/payment'

interface State {
    where: PaymentQueryWhere
}

export type Key = keyof PaymentQueryWhere

type Action = {
    addParam: (key: Key, value: string | number | boolean | object) => void
    removeParam: (key: Key) => void
}

export const useQueryParams = create<State & Action>((set) => ({
    where: {},
    addParam: (key, value) => set(({ where }) => {
        const updated = { ...where, [key]: value as PaymentQueryWhere[Key] } as PaymentQueryWhere
        return updated
    }),

    removeParam: (key) => set(({ where }) => {
        const { [key]: _, ...rest } = where
        return rest
    })
}))