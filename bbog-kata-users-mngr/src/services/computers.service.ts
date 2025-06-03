import { and, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { db } from '../db';
import { ComputerAssignments, Computers, Users } from '../db/schema';
import { serial } from 'drizzle-orm/mysql-core';

class ComputersServiceClass {
  listComputers(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    return db
      .select({
        id: Computers.id,
        model: Computers.model,
        serialNumber: Computers.serialNumber,
        status: Computers.status,
        createdAt: Computers.createdAt,
      })
      .from(Computers)
      .offset(offset)
      .limit(pageSize)
      .orderBy(desc(eq(Computers.status, 'Disponible')), desc(Computers.createdAt));
  }

  async countComputers() {
    const [res] = await db.select({ count: count(Computers.id) }).from(Computers);
    return res.count;
  }

  searchUsersWithNoComputer(query: string) {
    return db
      .select({
        id: Users.id,
        name: Users.name,
        email: Users.email,
      })
      .from(Users)
      .leftJoin(ComputerAssignments as any, eq(Users.id, ComputerAssignments.userId))
      .where(and(ilike(Users.name, `%${query}%`), isNull(ComputerAssignments.id)))
      .limit(10);
  }

  assignComputer(computerId: number, userId: number) {
    return db.transaction(async (tx) => {
      await tx.update(Computers).set({ status: 'Asignado' }).where(eq(Computers.id, computerId));
      await tx.insert(ComputerAssignments).values({
        computerId,
        userId,
      });
    });
  }
}

export const ComputersService = new ComputersServiceClass();
