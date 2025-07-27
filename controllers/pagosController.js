// controllers/pagosController.js

const db = require('../service/db');

exports.crearPago = (req, res) => {
  const { 
    nombre, correo, metodo_pago, 
    tipo_documento, numero_documento, numero_celular, billetera_usada 
  } = req.body;

  if (!nombre || !correo || !metodo_pago) {
    return res.status(400).json({ error: '⚠️ Nombre, correo y método de pago son obligatorios' });
  }

  const sql = `
    INSERT INTO pagos (nombre, correo, metodo_pago, tipo_documento, numero_documento, numero_celular, billetera_usada)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    nombre, correo, metodo_pago, 
    tipo_documento || null, numero_documento || null, numero_celular || null, billetera_usada || null
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar pago', detalles: err });
    }

    res.json({
      mensaje: '✅ Pago registrado correctamente',
      pagoId: result.insertId
    });
  });
};

