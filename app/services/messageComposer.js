import R from 'ramda'
const PlatformHelper = {
  duetime: duetime =>
    (~duetime.toUpperCase().indexOf('DUE') ? 'Due' : `in ${duetime} min`),
  destination: destination => {
    const isLetterUpperCase = letter => letter === letter.toUpperCase()
    const isWordUppercase = R.all(isLetterUpperCase, destination)
    return isWordUppercase ? destination.split('').join('.') : destination
  }
}

module.exports = PlatformHelper
