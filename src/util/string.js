const truncate = (string, length) => {
  return string.length > length ? string.substring(0, length - 3) + '...' : string
}

const capitalize = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export { truncate, capitalize }
