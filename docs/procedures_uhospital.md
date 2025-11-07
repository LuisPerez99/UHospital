# Procedimientos - UHospital

Este documento contiene la documentación de uso (firma, descripción, parámetros y ejemplos de llamada) de los procedimientos almacenados definidos en `console.sql`.

> Requisitos previos
> - Base de datos creada con las tablas y restricciones definidas en `console.sql`.
> - Usuario con permisos para ejecutar CALL/EXECUTE sobre los procedimientos.
> - Tener en cuenta restricciones de integridad (emails únicos, claves foráneas, checks).

---

## AgregarPaciente
Firma:
CALL AgregarPaciente(p_nombre, p_apellido, p_fecha_nacimiento, p_genero, p_telefono, p_direccion, p_email, p_password, p_username);

Descripción:
Inserta un registro en `usuario` y luego en `paciente`.

Parámetros:
- p_nombre: VARCHAR(100)
- p_apellido: VARCHAR(100)
- p_fecha_nacimiento: DATE (YYYY-MM-DD)
- p_genero: ENUM('M','F')
- p_telefono: VARCHAR(15)
- p_direccion: VARCHAR(255)
- p_email: VARCHAR(100) (único en `usuario`)
- p_password: VARCHAR(255)
- p_username: VARCHAR(50)
- p_rol: 'PACIENTE' (implícito en el procedimiento)

Ejemplo:
CALL AgregarPaciente('Ana', 'González', '1990-04-12', 'F', '55512345', 'Av. Siempre Viva 123', 'ana@example.com', 's3cret', 'ana_g', p_rol);

Notas:
- Si `p_email` ya existe en `usuario` fallará por la restricción UNIQUE.

---

## AgendarCita
Firma:
CALL AgendarCita(p_paciente_id, p_fecha_hora, p_motivo);

Descripción:
Inserta una cita para un paciente existente.

Parámetros:
- p_paciente_id: INT (debe existir en `paciente`)
- p_fecha_hora: DATETIME (YYYY-MM-DD HH:MM:SS)
- p_motivo: VARCHAR(255)

Ejemplo:
CALL AgendarCita(1, '2025-11-05 09:30:00', 'Consulta general');

Notas:
- Fallará si `p_paciente_id` no existe por la FK `fk_paciente`.

---

## AgregarHistorialMedico
Firma:
CALL AgregarHistorialMedico(p_paciente_id, p_diagnostico, p_tratamiento);

Descripción:
Añade un registro al historial médico de un paciente.

Parámetros:
- p_paciente_id: INT
- p_diagnostico: TEXT
- p_tratamiento: TEXT

Ejemplo:
CALL AgregarHistorialMedico(1, 'Hipertensión', 'Iniciar tratamiento con X');

---

## PrescribirMedicamento
Firma:
CALL PrescribirMedicamento(p_historial_medico_id, p_medicamento, p_dosis, p_frecuencia);

Descripción:
Agrega una `receta` asociada a un `historial_medico`.

Parámetros:
- p_historial_medico_id: INT
- p_medicamento: VARCHAR(255)
- p_dosis: VARCHAR(100)
- p_frecuencia: VARCHAR(100)

Ejemplo:
CALL PrescribirMedicamento(1, 'Paracetamol 500mg', '1 tableta', 'Cada 8 horas');

Notas:
- Asegúrate de que el `historial_medico` exista.

---

## AgregarDoctor
Firma:
CALL AgregarDoctor(p_nombre, p_apellido, p_especialidad, p_telefono, p_email, p_password, p_username);

Descripción:
Inserta un `usuario` y un `doctor` asociado.

Parámetros:
- p_nombre: VARCHAR(100)
- p_apellido: VARCHAR(100)
- p_especialidad: VARCHAR(100)
- p_telefono: VARCHAR(15)
- p_email: VARCHAR(100) (único en `usuario`)
- p_password: VARCHAR(255)
- p_username: VARCHAR(50)
- p_rol: 'DOCTOR' (implícito en el procedimiento)

Ejemplo:
CALL AgregarDoctor('Juan', 'Pérez', 'Cardiología', '55598765', 'juan.perez@example.com', 'pass123', 'dr_juan', p_rol);

---

## AsignarDoctorACita
Firma:
CALL AsignarDoctorACita(p_cita_id, p_doctor_id);

Descripción:
Crea la relación entre `cita` y `doctor` en la tabla `cita_doctor`.

Parámetros:
- p_cita_id: INT
- p_doctor_id: INT

Ejemplo:
CALL AsignarDoctorACita(2, 1);

Notas:
- Ambas IDs deben existir; la tabla usa PK compuesta.

---

## AgregarAdmin
Firma:
CALL AgregarAdmin(p_nombre, p_apellido, p_telefono, p_email, p_password, p_username);

Descripción:
Inserta un `usuario` y un `admin` asociado (la columna `password` en `admin` fue eliminada según `console.sql`).

Parámetros:
- p_nombre: VARCHAR(100)
- p_apellido: VARCHAR(100)
- p_telefono: VARCHAR(15)
- p_email: VARCHAR(100)
- p_password: VARCHAR(255)
- p_username: VARCHAR(50)
- p_rol: 'ADMINISTRADOR' (implícito en el procedimiento)

Ejemplo:
CALL AgregarAdmin('Carla', 'Santos', '55500011', 'carla@example.com', 'adminpass', 'carla_admin', p_rol);

---

## AgregarMedicamentoInventario
Firma:
CALL AgregarMedicamentoInventario(p_medicamento, p_cantidad, p_fecha_vencimiento);

Descripción:
Inserta un medicamento en `inventario_medicina`.

Parámetros:
- p_medicamento: VARCHAR(255) (único)
- p_cantidad: INT (>= 0)
- p_fecha_vencimiento: DATE (YYYY-MM-DD)

Ejemplo:
CALL AgregarMedicamentoInventario('Ibuprofeno 400mg', 100, '2026-06-30');

Notas:
- Fallará si `p_medicamento` ya existe o si `p_cantidad` es negativo.

---

## ActualizarCantidadMedicamento
Firma:
CALL ActualizarCantidadMedicamento(p_medicamento_id, p_nueva_cantidad);

Descripción:
Actualiza la cantidad en inventario para el medicamento con `id` dado.

Parámetros:
- p_medicamento_id: INT
- p_nueva_cantidad: INT

Ejemplo:
CALL ActualizarCantidadMedicamento(1, 80);

---

## EliminarMedicamentosVencidos
Firma:
CALL EliminarMedicamentosVencidos();

Descripción:
Elimina del inventario todos los medicamentos cuya `fecha_vencimiento` sea anterior a la fecha actual.

Ejemplo:
CALL EliminarMedicamentosVencidos();

---

## CrearOrdenCompraMedicina
Firma:
CALL CrearOrdenCompraMedicina(p_paciente_id, p_medicamento, p_cantidad);

Descripción:
Crea una orden de compra en `orden_compra_medicina` (estado por defecto 'PENDIENTE').

Parámetros:
- p_paciente_id: INT (puede ser NULL según FK)
- p_medicamento: VARCHAR(255)
- p_cantidad: INT (>= 0)

Ejemplo:
CALL CrearOrdenCompraMedicina(1, 'Paracetamol 500mg', 20);

Notas:
- `p_medicamento` debe existir en `inventario_medicina` si se exige la FK (según definición original).

---

## ActualizarEstadoOrdenCompra
Firma:
CALL ActualizarEstadoOrdenCompra(p_orden_id, p_nuevo_estado);

Descripción:
Cambia el estado de una orden de compra a 'PENDIENTE', 'COMPLETADA' o 'CANCELADA'.

Parámetros:
- p_orden_id: INT
- p_nuevo_estado: ENUM('PENDIENTE','COMPLETADA','CANCELADA')

Ejemplo:
CALL ActualizarEstadoOrdenCompra(3, 'COMPLETADA');

---

Notas finales y buenas prácticas
- Ejecuta las llamadas dentro de una transacción si vas a realizar varias operaciones dependientes.
- Captura errores como violaciones de UNIQUE o FKs y valida entradas antes de llamar.
- Para depurar, ejecuta SELECTs previos (por ejemplo, comprobar que el email no exista, o que el paciente tenga id X) antes de llamar al procedimiento.

Si quieres, puedo añadir ejemplos en SQL con BEGIN/COMMIT/ROLLBACK y manejo de errores, o generar scripts de carga (INSERTs) para los datos solicitados (clientes, tiendas, productos, repartidores).
