module.exports.isNotEmptyError = function(values) {
  let errors = []
  for (let i in values) {
    let v = values[i]
    if (typeof v === 'undefined' || v === null || v.toString().trim() === '') {
      errors.push({
        field: i,
        error: 'harus diisi!'
      })
    }
  }
  return errors
}
