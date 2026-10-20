import { Router } from 'express';

const router = Router();

// Endpoint de ejemplo resuelto
router.get('/total/:cantidad/:precio', (req, res) => {
  const cantidad = Number(req.params.cantidad);
  const precio = Number(req.params.precio);

  if (isNaN(cantidad) || isNaN(precio)) {
    return res.status(400).json({ error: 'Cantidad y precio deben ser números' });
  }

  const subtotal = cantidad * precio;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  res.json({ subtotal, iva, total });
});

// 1. GET /api/pedidos/descuento/:compra/:codigo
router.get('/descuento/:compra/:codigo', (req, res) => {
  const compra = Number(req.params.compra);
  const codigo = req.params.codigo;

  // Validar que la compra sea un número válido
  if (isNaN(compra) || compra <= 0) {
    return res.status(400).json({ error: 'El monto de la compra debe ser un número válido' });
  }

  let descuentoAplicado = 0;

  // Evaluar el código de descuento
  if (codigo === 'VERANO10') {
    descuentoAplicado = 0.10;
  } else if (codigo === 'MITAD') {
    descuentoAplicado = 0.50;
  } else {
    return res.status(400).json({ error: 'Código inválido' });
  }

  // Calcular monto inicial con el primer descuento
  let montoFinal = compra * (1 - descuentoAplicado);

  // Si el monto final supera los 1000, aplicar un 5% adicional
  if (montoFinal > 1000) {
    montoFinal = montoFinal * 0.95;
  }

  res.json({
    codigo,
    descuentoAplicado: `${descuentoAplicado * 100}%`,
    montoFinal: Number(montoFinal.toFixed(2))
  });
});

// 2. POST /api/pedidos/promedio
router.post('/promedio', (req, res) => {
  const { calificaciones } = req.body;

  // Validar que exista el arreglo y tenga al menos 3 elementos
  if (!Array.isArray(calificaciones) || calificaciones.length < 3) {
    return res.status(400).json({ 
      error: 'Se requiere un arreglo "calificaciones" con al menos 3 elementos' 
    });
  }

  // Calcular el promedio
  const suma = calificaciones.reduce((acc, curr) => acc + curr, 0);
  const promedioCalculado = suma / calificaciones.length;
  const promedio = Number(promedioCalculado.toFixed(2));

  // Determinar el nivel según el promedio
  let nivel = '';
  if (promedio >= 8) {
    nivel = 'excelente';
  } else if (promedio >= 6) {
    nivel = 'aceptable';
  } else {
    nivel = 'reprobado';
  }

  res.json({ promedio, nivel });
});

export default router;