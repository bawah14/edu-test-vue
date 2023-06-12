import { getAuthHeader, getAuthAndMultipartHeader } from './headers'
import { serializeQueryParams } from './query'
import { compareValues } from './compare'
import { formatDate, formatDateTime, formatTime, formatRCF } from './date'
import { currencyFormat } from './currency'
import { truncate, capitalize } from './string'
import { detectMobile } from './platform'
import { disableScrollLock, enableScrollLock } from './body'

export {
  getAuthHeader,
  getAuthAndMultipartHeader,
  serializeQueryParams,
  compareValues,
  formatDate,
  formatDateTime,
  formatTime,
  formatRCF,
  currencyFormat,
  truncate,
  capitalize,
  detectMobile,
  disableScrollLock,
  enableScrollLock
}
