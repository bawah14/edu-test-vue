const getAuthHeader = () => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  return {
    Authorization: 'Bearer ' + userData.token.access_token
  }
}
const getAuthAndMultipartHeader = () => {
  const header = getAuthHeader()
  header['Content-Type'] = 'multipart/form-data'
  return header
}

export { getAuthHeader, getAuthAndMultipartHeader }
