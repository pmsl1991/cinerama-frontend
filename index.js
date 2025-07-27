const express = require('express');
const cors = require('cors');
const app = express();
const pagosRoutes = require('./routes/pagosRoutes'); // asegúrate del nombre correcto

app.use(cors());
app.use(express.json());

app.use('/api/pagos', pagosRoutes); // ✅ esta línea monta la ruta correctamente

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});