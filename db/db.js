const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SSB@1234',
  database: 'postal_db',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('SSB@1234' + '\0'),
  },
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting:', err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});


module.exports = connection;
