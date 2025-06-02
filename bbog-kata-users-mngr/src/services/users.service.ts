import { count, desc } from 'drizzle-orm';
import { db } from '../db';
import { Users } from '../db/schema';
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
}

export const UsersService = new UsersServiceClass();
