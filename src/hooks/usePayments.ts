'use client'

import { api } from "~/trpc/react"
import { type Key, useQueryParams } from "./useQueryParams"

export const usePayments = () => {

    const utils = api.useUtils()
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

    const deleteData = (id: number) => {
        utils.payment.all.setData({ where }, (old) => {
            return old?.filter(p => p.id !== id)
        })
    }

    return {
        payments: data,
        loading: isLoading,
        setValue,
        getvalue,
        deleteData

    }
}