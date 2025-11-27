import type { Cita } from "../models/models";

export const citas: Cita[] = [
    {
        id: 1,
        pacienteEmail: 'patient1@example.com',
        doctorEmail: 'doctor1@example.com',
        fecha: '2024-07-01',
        hora: '10:00',
        motivo: 'Consulta general',
        estado: 'PENDIENTE'
    },
    {
        id: 2,
        pacienteEmail: 'patient2@example.com',
        doctorEmail: 'doctor2@example.com',
        fecha: '2024-07-02',
        hora: '14:00',
        motivo: 'Dolor de cabeza',
        estado: 'COMPLETADA'
    },
    {
        id: 3,
        pacienteEmail: 'patient3@example.com',
        doctorEmail: 'doctor3@example.com',
        fecha: '2024-07-03',
        hora: '09:30',
        motivo: 'Revisión anual',
        estado: 'CANCELADA'
    },
    {
        id: 4,
        pacienteEmail: 'patient4@example.com',
        doctorEmail: 'doctor4@example.com',
        fecha: '2024-07-04',
        hora: '11:00',
        motivo: 'Consulta de seguimiento',
        estado: 'EN_PROGRESO'
    },
    {
        id: 5,
        pacienteEmail: 'patient5@example.com',
        doctorEmail: 'doctor5@example.com',
        fecha: '2024-07-05',
        hora: '15:00',
        motivo: 'Consulta de rutina',
        estado: 'CONFIRMADA'
    }
];