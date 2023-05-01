export function removeEmptyAttribute(object: Object): Object {
    return Object.fromEntries(Object.entries(object).filter(([,v])=>!!v))
}