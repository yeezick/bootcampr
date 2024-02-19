// Should be redone leveraging DayJs
// Jira: BC-618
export const formatTimestamp = timestamp => {
  const date = new Date(timestamp)
  const year = date.getFullYear().toString().slice(-2)
  const month = date.getMonth() + 1
  const day = ('0' + date.getDate()).slice(-2)
  let hours = date.getHours()
  hours = hours % 12
  hours = hours ? hours : 12
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours}:${minutes} ${ampm}`
  return `${month}/${day}/${year}, ${formattedTime}`
}

/**
 * Compares 2 objects for deep equality.
 * Object comparisons via "==" or "===" only compare references, not contents.
 */
export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }

  return true
}

const isObject = object => object != null && typeof object === 'object'
