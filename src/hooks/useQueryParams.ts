import { create } from 'zustand'
import { type PaymentQueryWhere } from '~/schemas/payment'

interface State {
    where: PaymentQueryWhere
}

export type Key = keyof PaymentQueryWhere

type Action = {
    addParam: (key: Key, value: PaymentQueryWhere[Key]) => void
    removeParam: (key: Key) => void
    reset: () => void
}

export const useQueryParams = create<State & Action>((set) => ({
    where: {},
    addParam: (key, value) => set(({ where }) => {
        const updated = { ...where, [key]: value }
        return { where: updated }
    }),

    removeParam: (key) => set(({ where }) => {
        const { [key]: _, ...rest } = where
        return { where: rest }
    }),

    reset: () => set(() => ({ where: {} }))
}))