// routes/pagosRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../service/db');
const pagosController = require('../controllers/pagosController');

let clients = [];

// ✅ Obtener todos los pagos
router.get('/', (req, res) => {
  db.query('SELECT * FROM pagos ORDER BY fecha DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pagos', detalles: err });
    res.json(results);
  });
});

// 🔁 STREAM para actualizaciones en tiempo real
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };

  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
  });
});

// 🟢 Función para notificar a los clientes
function notificarClientes() {
  db.query('SELECT * FROM pagos ORDER BY fecha DESC', (err, results) => {
    if (err) return;
    clients.forEach(client => {
      client.res.write(`data: ${JSON.stringify(results)}\n\n`);
    });
  });
}

// 📥 Crear pago
router.post('/', pagosController.crearPago);

// ✏️ Actualizar pago (opcional)
router.put('/:id', (req, res) => {
  const { nombre, correo, metodo_pago, tipo_documento, numero_documento, numero_celular, billetera_usada } = req.body;
  const sql = `
    UPDATE pagos
    SET nombre = ?, correo = ?, metodo_pago = ?, tipo_documento = ?, numero_documento = ?, numero_celular = ?, billetera_usada = ?
    WHERE id = ?`;
  db.query(sql, [nombre, correo, metodo_pago, tipo_documento, numero_documento, numero_celular, billetera_usada, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    notificarClientes();
    res.json({ mensaje: 'Pago actualizado correctamente' });
  });
});

// ❌ Eliminar pago (opcional)
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM pagos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    notificarClientes();
    res.json({ mensaje: 'Pago eliminado correctamente' });
  });
});

// 📤 Exporta el router
module.exports = router;
