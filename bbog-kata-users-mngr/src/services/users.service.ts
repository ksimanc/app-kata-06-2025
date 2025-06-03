import { and, count, desc, eq, ilike } from 'drizzle-orm';
import { db } from '../db';
import { Users, UserStatus } from '../db/schema';
import { RegisterUserInput } from '../model/user';

class UsersServiceClass {
  async registerUser(userData: RegisterUserInput) {
    const [createdUser] = await db.insert(Users).values(userData).returning({ id: Users.id, name: Users.name });
    return createdUser;
  }

  async listUsers(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    return db.select().from(Users).offset(offset).limit(pageSize).orderBy(desc(Users.createdAt));
  }

  async countUsers() {
    const [res] = await db.select({ count: count(Users.id) }).from(Users);
    return res.count;
  }

  async searchUser(query: string) {
    // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(1000);

    return db
      .select({ id: Users.id, name: Users.name, role: Users.role })
      .from(Users)
      .where(and(ilike(Users.name, `%${query}%`), eq(Users.status, 'Aprobado')))
      .limit(10);
  }

  updateUserStatus(id: number, status: UserStatus) {
    return db.update(Users).set({ status }).where(eq(Users.id, id));
  }
}

export const UsersService = new UsersServiceClass();
