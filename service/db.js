const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cinerama'
});

conexion.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos');
});

module.exports = conexion;