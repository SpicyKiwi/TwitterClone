const { Client } = require('pg')
const client = new Client('postgresql://twitterclone@localhost:5432/twitterclone')


module.exports = client