const disableScrollLock = () => {
  // document.body.style.position = ''
  // document.body.style.width = ''
  document.body.style['overflow'] = 'auto'
  document.documentElement.style['overflow'] = 'auto'
  // document.body.style['height'] = ''
}
const enableScrollLock = () => {
  // document.body.style.position = 'fixed'
  // document.body.style.width = '100%'
  document.body.style['overflow'] = 'hidden'
  document.documentElement.style['overflow'] = 'hidden'
  // document.body.style['height'] = '100%'
}

export { disableScrollLock, enableScrollLock }
