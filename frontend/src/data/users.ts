import type { User, Paciente, Admin, Doctor } from '../models/models';

export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'ADMIN',
        active: true
    },
    {
        id: 2,
        username: 'doctor1',
        email: 'doctor1@example.com',
        password: 'doctorpassword',
        role: 'DOCTOR'
    },
    {
        id: 3,
        username: 'patient1',
        email: 'patient1@example.com',
        password: 'patientpassword',
        role: 'PACIENTE',
        active: true
    },
    {
        id: 4,
        username: 'patient2',
        email: 'patient2@example.com',
        password: 'patientpassword2',
        role: 'PACIENTE'
    },
    {
        id: 5,
        username: 'doctor2',
        email: 'doctor2@example.com',
        password: 'doctorpassword2',
        role: 'DOCTOR',
        active: true
    },
    {
        id: 6,
        username: 'patient3',
        email: 'patient3@example.com',
        password: 'patientpassword3',
        role: 'PACIENTE'
    },
    {
        id: 7,
        username: 'patient4',
        email: 'patient4@example.com',
        password: 'patientpassword4',
        role: 'PACIENTE'
    }
];

export const pacientes: Paciente[] = [
    {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'patient1@example.com',
        fecha_nacimiento: '1990-01-01',
        genero: 'Masculino',
        telefono: '123456789',
        direccion: 'Calle Falsa 123'
    },
    {
        nombre: 'María',
        apellido: 'Gómez',
        email: 'patient2@example.com',
        fecha_nacimiento: '1992-02-02',
        genero: 'Femenino',
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 456'
    },
    {
        nombre: 'Carlos',
        apellido: 'López',
        email: 'patient3@example.com',
        fecha_nacimiento: '1994-03-03',
        genero: 'Masculino',
        telefono: '555555555',
        direccion: 'Boulevard Central 789'
    },
    {
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'patient4@example.com',
        fecha_nacimiento: '1996-04-04',
        genero: 'Femenino',
        telefono: '444444444',
        direccion: 'Calle Luna 101'
    }
];

export const doctors: Doctor[] = [
    {
        nombre: 'Dr. Luis',
        apellido: 'Ramírez',
        especialidad: 'Cardiología',
        email: 'doctor1@example.com',
        fecha_nacimiento: '1980-05-15',
        genero: 'Masculino',
        telefono: '222333444',
        direccion: 'Calle Salud 123'
    },
    {
        nombre: 'Dra. Sofía',
        apellido: 'Fernández',
        especialidad: 'Pediatría',
        email: 'doctor2@example.com',
        fecha_nacimiento: '1985-08-20',
        genero: 'Femenino',
        telefono: '333444555',
        direccion: 'Avenida Niños 456'
    }
];

export const admins: Admin[] = [
    {
        nombre: 'Luis',
        apellido: 'Pérez',
        email: 'admin@example.com',
        telefono: '111222333',
        fecha_nacimiento: '1975-07-10',
        genero: 'Masculino',
        direccion: 'Calle Admin 789'
    }
];