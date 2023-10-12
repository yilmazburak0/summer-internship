export function findAndUpdate(array, record, matchField = '_id',upsert=false) {
    let foundIndex = array.findIndex(val => val[matchField] === record[matchField])
    
    if(array[foundIndex])
        array[foundIndex] = record
    else if(upsert)    
        array.push(record)

    return array
}
export function findAndDelete(array, record, matchField = '_id') {
    return array.filter(val => val[matchField] !== record[matchField])
}