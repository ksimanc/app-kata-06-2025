import { Users } from '../db/schema';

export type RegisterUserInput = typeof Users.$inferInsert;
