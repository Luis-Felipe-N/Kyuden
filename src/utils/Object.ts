export function removeEmptyAttribute(object: Object): Object {
    return Object.fromEntries(Object.entries(object).filter(([,v])=>!!v))
}

export function arrangeAndAddAttributes(object: Object, valueToAdd: any) {
    const arrangedObject = Object.entries(object).map(([,v], i) => [i, v])
    const alreadyHaveThisValue = arrangedObject.find(([,value]) => value === valueToAdd)

    if (alreadyHaveThisValue) return Object.fromEntries(arrangedObject);

    const newValue = [Object.entries(object).length, valueToAdd]
    const newArray = [...arrangedObject, newValue]
    return Object.fromEntries(newArray)
}

export function arrangeAndAddObject(object: Object, valueToAdd: any, uniqueIdentifier: any) {
    const arrangedObject = Object.entries(object).map(([,v], i) => [i, v])
    const alreadyHaveThisValue = arrangedObject.find(([,value]) => value === uniqueIdentifier)

    if (alreadyHaveThisValue) return Object.fromEntries(arrangedObject);

    const newValue = [Object.entries(object).length, valueToAdd]
    const newArray = [...arrangedObject, newValue]
    return Object.fromEntries(newArray)
}