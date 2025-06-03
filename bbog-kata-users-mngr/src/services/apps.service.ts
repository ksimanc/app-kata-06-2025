import { and, count, desc, eq, inArray, isNull, or } from 'drizzle-orm';
import { db } from '../db';
import { AccessRequests, Apps, Users } from '../db/schema';

class AppsServiceClass {
  getAccessRequests(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    return db
      .select({
        id: AccessRequests.id,
        status: AccessRequests.status,
        createdAt: AccessRequests.createdAt,
        user: {
          name: Users.name,
          role: Users.role,
          area: Users.area,
        },
        app: {
          name: Apps.name,
        },
      })
      .from(AccessRequests)
      .innerJoin(Apps as any, eq(AccessRequests.appId, Apps.id))
      .innerJoin(Users as any, eq(AccessRequests.userId, Users.id))
      .offset(offset)
      .limit(pageSize)
      .orderBy(desc(AccessRequests.createdAt));
  }

  async countAccessRequests() {
    const [res] = await db.select({ count: count(AccessRequests.id) }).from(AccessRequests);
    return res.count;
  }

  giveAccessToApps(userId: string, appIds: string[]) {
    const values = appIds.map((appId) => ({
      appId: +appId,
      userId: +userId,
    }));

    return db.insert(AccessRequests).values(values);
  }

  async getAppsAvailableForUser(userId: string) {
    const [user] = await db
      .select({
        role: Users.role,
      })
      .from(Users)
      .where(eq(Users.id, +userId));

    if (!user) {
      throw new Error('User not found');
    }

    const apps = await db
      .select({
        id: Apps.id,
        name: Apps.name,
        description: Apps.description,
      })
      .from(Apps)
      .where(or(isNull(Apps.requiredRole), eq(Apps.requiredRole, user.role)));

    const appIds = apps.map((app) => app.id);

    const appsWithAccessRequest = await db
      .select({ appId: AccessRequests.appId })
      .from(AccessRequests)
      .where(and(eq(AccessRequests.userId, +userId), inArray(AccessRequests.appId, appIds)));

    const appsWithAccessRequestIds = appsWithAccessRequest.map((app) => app.appId);

    return apps.filter((app) => !appsWithAccessRequestIds.includes(app.id));
  }
}

export const AppsService = new AppsServiceClass();
