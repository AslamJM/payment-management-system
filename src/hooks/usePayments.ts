'use client'

import { api } from "~/trpc/react"
import { Key, useQueryParams } from "./useQueryParams"

export const usePayments = () => {

    const where = useQueryParams(state => state.where)
    const addParams = useQueryParams(state => state.addParam)
    const { data, isLoading, refetch } = api.payment.all.useQuery({
        where
    })


    const getvalue = <R>(key: Key): R | null => {
        if (!where[key]) return null
        return where[key] as R
    }

    const setValue = (key: Key, value: string | number | boolean | object) => {
        addParams(key, value)
    }

    return {
        payments: data,
        loading: isLoading,
        setValue,
        getvalue,

    }
}