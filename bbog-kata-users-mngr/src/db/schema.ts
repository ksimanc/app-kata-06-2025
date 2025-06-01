import * as pg from 'drizzle-orm/pg-core';

const createdAt = pg.timestamp().notNull().defaultNow();

const updatedAt = pg
  .timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userRoles = [
  'Desarrollador',
  'Analista de Calidad',
  'Gestor de Producto',
  'Agilista',
  'Ingeniero(a) DevOps',
  'Diseñador(a) de Experiencia',
] as const;

type UserRole = (typeof userRoles)[number];
type UserStatus = 'Pendiente' | 'Aprobado' | 'Rechazado';

export const Users = pg.pgTable('users', {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  email: pg.text().notNull().unique(),
  area: pg.text().notNull(),
  role: pg.text().notNull().$type<UserRole>(),
  status: pg.text().notNull().$type<UserStatus>().default('Pendiente'),
  createdAt,
  updatedAt,
});

export const Apps = pg.pgTable('apps', {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  description: pg.text(),
  requiredRole: pg.text().$type<UserRole>(),
  createdAt,
  updatedAt,
});

type AccessRequestStatus = 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';

export const AccessRequests = pg.pgTable('access_requests', {
  id: pg.serial().primaryKey(),
  userId: pg
    .integer()
    .notNull()
    .references(() => Users.id),
  appId: pg
    .integer()
    .notNull()
    .references(() => Apps.id),
  status: pg.text().notNull().$type<AccessRequestStatus>().default('Pendiente'),
  comments: pg.text(),
  createdAt,
  updatedAt,
});

type ComputerStatus = 'Disponible' | 'Asignado' | 'En mantenimiento';

export const Computers = pg.pgTable('computers', {
  id: pg.serial().primaryKey(),
  model: pg.text().notNull(),
  serialNumber: pg.text().notNull().unique(),
  status: pg.text().notNull().$type<ComputerStatus>().default('Disponible'),
  specifications: pg.jsonb(),
  createdAt,
  updatedAt,
});

type ComputerAssignmentStatus = 'Activo' | 'Devuelto';

export const ComputerAssignments = pg.pgTable('computer_assignments', {
  id: pg.serial().primaryKey(),
  userId: pg
    .integer()
    .notNull()
    .references(() => Users.id),
  computerId: pg
    .integer()
    .notNull()
    .references(() => Computers.id),
  returnDate: pg.timestamp(),
  status: pg.text().notNull().$type<ComputerAssignmentStatus>().default('Activo'),
  comments: pg.text(),
  createdAt,
  updatedAt,
});
