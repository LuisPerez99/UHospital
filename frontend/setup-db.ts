import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get DATABASE_URL from environment variable
const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  try {
    console.log('Creating UHospital database schema...');

    // Create roles table
    await sql`DROP TABLE IF EXISTS roles CASCADE`;
    await sql`
      CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        nombre_rol VARCHAR(50) NOT NULL UNIQUE
      )
    `;
    console.log('✓ Created roles table');

    // Create usuario table
    await sql`DROP TABLE IF EXISTS usuario CASCADE`;
    await sql`
      CREATE TABLE usuario (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(50) NOT NULL,
        rol VARCHAR(50),
        CONSTRAINT fk_rol_usuario FOREIGN KEY (rol) REFERENCES roles(nombre_rol) ON DELETE SET NULL ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_rol_usuario ON usuario(rol)`;
    console.log('✓ Created usuario table');

    // Create admin table
    await sql`DROP TABLE IF EXISTS admin CASCADE`;
    await sql`
      CREATE TABLE admin (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        apellido VARCHAR(100),
        telefono VARCHAR(15),
        email VARCHAR(100) NOT NULL UNIQUE,
        CONSTRAINT admin_fk_email FOREIGN KEY (email) REFERENCES usuario(email) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_email_admin ON admin(email)`;
    console.log('✓ Created admin table');

    // Create doctor table
    await sql`DROP TABLE IF EXISTS doctor CASCADE`;
    await sql`
      CREATE TABLE doctor (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        especialidad VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        telefono VARCHAR(15),
        CONSTRAINT doctor_fk_email FOREIGN KEY (email) REFERENCES usuario(email) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_especialidad ON doctor(especialidad)`;
    console.log('✓ Created doctor table');

    // Create paciente table
    await sql`DROP TABLE IF EXISTS paciente CASCADE`;
    await sql`
      CREATE TABLE paciente (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        genero VARCHAR(1) CHECK (genero IN ('M', 'F', 'O')) NOT NULL,
        telefono VARCHAR(15),
        direccion VARCHAR(255),
        CONSTRAINT paciente_fk_email FOREIGN KEY (email) REFERENCES usuario(email) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_email_paciente ON paciente(email)`;
    console.log('✓ Created paciente table');

    // Create cita table
    await sql`DROP TABLE IF EXISTS cita CASCADE`;
    await sql`
      CREATE TABLE cita (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER NOT NULL,
        fecha_hora TIMESTAMP NOT NULL,
        motivo VARCHAR(255),
        CONSTRAINT cita_fk_paciente FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_paciente_cita ON cita(paciente_id)`;
    await sql`CREATE INDEX idx_fecha_hora ON cita(fecha_hora)`;
    console.log('✓ Created cita table');

    // Create cita_doctor table
    await sql`DROP TABLE IF EXISTS cita_doctor CASCADE`;
    await sql`
      CREATE TABLE cita_doctor (
        cita_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        PRIMARY KEY (cita_id, doctor_id),
        CONSTRAINT cita_doctor_fk_cita FOREIGN KEY (cita_id) REFERENCES cita(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT cita_doctor_fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_doctor_cita ON cita_doctor(doctor_id)`;
    console.log('✓ Created cita_doctor table');

    // Create historial_medico table
    await sql`DROP TABLE IF EXISTS historial_medico CASCADE`;
    await sql`
      CREATE TABLE historial_medico (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER NOT NULL,
        diagnostico TEXT NOT NULL,
        tratamiento TEXT,
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT historial_medico_fk_paciente FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_paciente_historial ON historial_medico(paciente_id)`;
    console.log('✓ Created historial_medico table');

    // Create receta table
    await sql`DROP TABLE IF EXISTS receta CASCADE`;
    await sql`
      CREATE TABLE receta (
        id SERIAL PRIMARY KEY,
        historial_medico_id INTEGER NOT NULL,
        medicamento VARCHAR(255) NOT NULL,
        dosis VARCHAR(100) NOT NULL,
        frecuencia VARCHAR(100) NOT NULL,
        CONSTRAINT receta_fk_historial FOREIGN KEY (historial_medico_id) REFERENCES historial_medico(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_historial_medico ON receta(historial_medico_id)`;
    await sql`CREATE INDEX idx_medicamento_receta ON receta(medicamento)`;
    console.log('✓ Created receta table');

    // Create inventario_medicina table
    await sql`DROP TABLE IF EXISTS inventario_medicina CASCADE`;
    await sql`
      CREATE TABLE inventario_medicina (
        id SERIAL PRIMARY KEY,
        medicamento VARCHAR(255) NOT NULL UNIQUE,
        cantidad INTEGER NOT NULL CHECK (cantidad >= 0),
        fecha_vencimiento DATE NOT NULL
      )
    `;
    await sql`CREATE INDEX idx_medicamento_inventario ON inventario_medicina(medicamento)`;
    console.log('✓ Created inventario_medicina table');

    // Create orden_compra_medicina table
    await sql`DROP TABLE IF EXISTS orden_compra_medicina CASCADE`;
    await sql`
      CREATE TABLE orden_compra_medicina (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER,
        medicamento VARCHAR(255) NOT NULL,
        cantidad INTEGER NOT NULL CHECK (cantidad >= 0),
        fecha_orden TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        estado VARCHAR(20) CHECK (estado IN ('PENDIENTE', 'COMPLETADA', 'CANCELADA')) NOT NULL DEFAULT 'PENDIENTE',
        CONSTRAINT orden_compra_fk_medicamento FOREIGN KEY (medicamento) REFERENCES inventario_medicina(medicamento) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT orden_compra_fk_paciente FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE SET NULL ON UPDATE CASCADE
      )
    `;
    await sql`CREATE INDEX idx_medicamento_orden ON orden_compra_medicina(medicamento)`;
    await sql`CREATE INDEX idx_paciente_orden ON orden_compra_medicina(paciente_id)`;
    console.log('✓ Created orden_compra_medicina table');

    // Insert roles
    await sql`INSERT INTO roles (nombre_rol) VALUES ('ADMIN'), ('DOCTOR'), ('PACIENTE')`;
    console.log('✓ Inserted roles');

    // Insert sample users
    await sql`
      INSERT INTO usuario (email, password, username, rol) VALUES
        ('admin@uhospital.com', '$2a$10$2dCvtkKDIc98KF5hZLeKouCOMX7VUztpsrkGahwK.Nko.bIEe4O0q', 'admin_user', 'ADMIN'),
        ('admin2@uhospital.com', '$2a$10$4pLHfDOu/rXyptL.opvLXeP1Vge0nVH09kLMM7oh1hAeLhmargJ0e', 'admin_user', 'ADMIN'),
        ('maria.garcia@example.com', '$2a$10$D6UDRMGnprkKwXzYi9lct.GvXnRx988hGMSMq.LZTWCaPFLm9AlpW', 'maria.garcia', 'PACIENTE'),
        ('dr.sanchez@example.com', '$2a$10$Vsra/KZpMVMLGqoi6UQ80uRFIFkiBR0/78HuDwhPjDbY8wugUf/ym', 'dr.sanchez', 'DOCTOR'),
        ('dr.sanchez2@example.com', '$2a$10$9gNd6LA/0jz4BkDvSl5XleZQ7r0cHOEif.IMCUWEpW2qu7CYHoGMe', 'dr.sanchez2', 'DOCTOR'),
        ('pdrpm93@live.com', '$2a$10$ZVGhjYqfAYQl50hPhSafdu7BeQvVouUKEvOfm7air/8d40jQ2lOLO', 'pdrpm', 'PACIENTE'),
        ('pdrpm93@gmail.com', '$2a$10$TBAIQzlY85fd.mjSDrhgWuwSQFZKQmLa9QapkuGiCkQhTznWlEFJi', 'pdrpm', 'DOCTOR'),
        ('pdrpmadmin@example.com', '$2a$10$39B4AqNeRg3mzSHapMsxseGczaCDraBWE5tG/QktexVXpNq332VbG', 'adminpdrpm', 'ADMIN')
    `;
    console.log('✓ Inserted users');

    // Insert admins
    await sql`
      INSERT INTO admin (nombre, apellido, telefono, email) VALUES
        ('Juan', 'Pérez', '+34612345678', 'admin@uhospital.com'),
        ('Juan', 'Pérez', '+34612345678', 'admin2@uhospital.com'),
        ('luis', 'perez', '12344566', 'pdrpmadmin@example.com')
    `;
    console.log('✓ Inserted admins');

    // Insert doctors
    await sql`
      INSERT INTO doctor (nombre, apellido, especialidad, email, telefono) VALUES
        ('Carlos', 'Sánchez', 'Cardiología', 'dr.sanchez@example.com', '+34910000000'),
        ('Carlos', 'Sánchez', 'Cardiología', 'dr.sanchez2@example.com', '+34910000000'),
        ('luis', 'perez', 'doctor', 'pdrpm93@gmail.com', '12345678')
    `;
    console.log('✓ Inserted doctors');

    // Insert patients
    await sql`
      INSERT INTO paciente (nombre, apellido, email, fecha_nacimiento, genero, telefono, direccion) VALUES
        ('María', 'García', 'maria.garcia@example.com', '1992-08-15', 'F', '+34911222333', 'Calle Mayor 123, Madrid'),
        ('Luis', 'Pérez', 'pdrpm93@live.com', '1999-12-09', 'M', '11111111', '11 - 17')
    `;
    console.log('✓ Inserted patients');

    console.log('\n✅ Database setup completed successfully!');
    
    // Verify setup
    const result = await sql`SELECT COUNT(*) as count FROM usuario`;
    console.log(`\nTotal users in database: ${result[0].count}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
