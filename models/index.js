const { bookshelf } = require('../db/bookshelf')
const securePassword = require('bookshelf-secure-password')

bookshelf.plugin(securePassword)

exports.user = bookshelf.Model.extend({
  tableName: 'user',
  hasSecurePassword: true
})

exports.example = bookshelf.Model.extend({
  tableName: 'example'
  // order: integer
  // file: string
})
