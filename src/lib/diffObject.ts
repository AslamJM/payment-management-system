type Obj = Record<string, string | number | boolean | null | Date>

export function diffObject(obj1: Obj, obj2: Obj): Partial<Obj> {
    const keys1 = Object.keys(obj1)

    const diff: Partial<Obj> = {}

    for (const k of keys1) {
        if (obj1[k] !== obj2[k]) {
            diff[k] = obj2[k]
        }
    }

    return diff

}