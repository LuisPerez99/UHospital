export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  active?: boolean;
}

export interface Paciente {
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
  historial_medico?: string;
}

export interface Doctor {
  nombre: string;
  apellido: string;
  especialidad: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  genero: string;
  direccion: string;
}

export interface Admin {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  genero: string;
  direccion: string;
}

export interface Cita{
  id: number;
  pacienteEmail: string;
  doctorEmail: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
}

export type ExtendedUser = User & {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  genero?: string;
  telefono?: string;
  direccion?: string;
  especialidad?: string;
  historial_medico?: string;
};