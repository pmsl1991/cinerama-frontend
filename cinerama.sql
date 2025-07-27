USE cinerama;

-- Crear la tabla pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL, -- Tarjeta de crédito / App Agora / Billeteras electrónicas
    tipo_documento VARCHAR(50),       -- Solo si es billetera
    numero_documento VARCHAR(50),     -- Solo si es billetera
    numero_celular VARCHAR(20),       -- Solo si es billetera
    billetera_usada VARCHAR(20),      -- Yape / Plin / Tunki
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW COLUMNS FROM pagos;

select * from pagos;






