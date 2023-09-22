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
