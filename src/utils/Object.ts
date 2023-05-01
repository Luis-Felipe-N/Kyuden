export function removeEmptyAttribute(object: Object): Object {
    return Object.fromEntries(Object.entries(object).filter(([,v])=>!!v))
}

export function arrangeAndAddAttributes(object: Object, value: any) {
    const arrangedObject = [...Object.entries(object).map(([,v], i) => [i, v]), [Object.entries(object).length, value]]
    return Object.fromEntries(arrangedObject)
}