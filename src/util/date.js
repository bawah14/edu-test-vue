import dayjs from 'dayjs'
const formatDate = (value) => {
  if (value) {
    return dayjs(String(value)).format('DD MMM YYYY')
  }
}

const formatDateTime = (value) => {
  if (value) {
    return dayjs(String(value)).format('DD MMM YYYY - HH:mm')
  }
}

const formatTime = (value) => {
  if (value) {
    return dayjs(String(value)).format('HH:mm')
  }
}

const formatRCF = (value) => {
  if (value) {
    return dayjs(String(value)).format('YYYY-MM-DDTHH:mm:ssZ')
  }
}

export { formatDate, formatDateTime, formatTime, formatRCF }
