export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Paciente {
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
}

export interface Doctor {
  nombre: string;
  apellido: string;
  especialidad: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
}

export interface Admin {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
}
