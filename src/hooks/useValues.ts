import { useMemo } from "react";
import { api } from "~/trpc/react";

export const useValues = () => {
    const shops = api.shops.all.useQuery();
    const companies = api.company.all.useQuery()
    const collectors = api.collector.all.useQuery()
    const regions = api.regions.all.useQuery()

    const shopValues = useMemo(() => {
        if (shops.data) {
            return shops.data.map((d) => ({
                id: d.id,
                value: d.name,
                label: d.name,
            }));
        }
        return [];
    }, [shops]);

    const companyValues = useMemo(() => {
        if (companies.data) {
            return companies.data.map((d) => ({
                id: d.id,
                value: d.name,
                label: d.name,
            }));
        }
        return [];
    }, [companies]);

    const collectorValues = useMemo(() => {
        if (collectors.data) {
            return collectors.data.map((d) => ({
                id: d.id,
                value: d.name,
                label: d.name,
            }));
        }
        return [];
    }, [collectors]);

    const regionValues = useMemo(() => {
        if (regions.data) {
            return regions.data.map((d) => ({
                id: d.id,
                value: d.name,
                label: d.name,
            }));
        }
        return [];
    }, [regions]);

    return { shopValues, companyValues, collectorValues, regionValues }
}