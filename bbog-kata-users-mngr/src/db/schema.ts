import * as pg from 'drizzle-orm/pg-core';

const createdAt = pg.timestamp().notNull().defaultNow();

const updatedAt = pg
  .timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userRoles = ['Developer', 'Tester', 'Product Owner', 'Agile Coach', 'DevOps', 'UX/UI'] as const;

type UserRole = (typeof userRoles)[number];
type UserStatus = 'pending' | 'approved' | 'rejected';

export const Users = pg.pgTable('users', {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  email: pg.text().notNull().unique(),
  area: pg.text().notNull(),
  role: pg.text().notNull().$type<UserRole>(),
  status: pg.text().notNull().$type<UserStatus>().default('pending'),
  createdAt,
  updatedAt,
});

export const Applications = pg.pgTable('applications', {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  description: pg.text(),
  requiredRole: pg.text().$type<UserRole>(),
  createdAt,
  updatedAt,
});

type AccessRequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export const AccessRequests = pg.pgTable('access_requests', {
  id: pg.serial().primaryKey(),
  userId: pg
    .integer()
    .notNull()
    .references(() => Users.id),
  applicationId: pg
    .integer()
    .notNull()
    .references(() => Applications.id),
  status: pg.text().notNull().$type<AccessRequestStatus>().default('pending'),
  comments: pg.text(),
  createdAt,
  updatedAt,
});

type ComputerStatus = 'available' | 'assigned' | 'maintenance';

export const Computers = pg.pgTable('computers', {
  id: pg.serial().primaryKey(),
  model: pg.text().notNull(),
  serialNumber: pg.text().notNull().unique(),
  status: pg.text().notNull().$type<ComputerStatus>().default('available'),
  specifications: pg.jsonb(),
  createdAt,
  updatedAt,
});

type ComputerAssignmentStatus = 'active' | 'returned';

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
  status: pg.text().notNull().$type<ComputerAssignmentStatus>().default('active'),
  comments: pg.text(),
  createdAt,
  updatedAt,
});
