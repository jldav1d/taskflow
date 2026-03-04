import { GLOBAL_PERMISSIONS } from '@/constants/permissions';
import { rolePermissions } from './schema/schema';
import { eq } from 'drizzle-orm';
import { MemberRole } from './schema/enums';
import { db } from './connect_db';

async function seedRolePermissions() {
  console.log('seeding role permissions...');

  for (const [role, permissions] of Object.entries(GLOBAL_PERMISSIONS)) {
    // Optional: prevent duplicate insert
    const existing = await db
      .select()
      .from(rolePermissions)
      .where(eq(rolePermissions.role, role as MemberRole));

    if (existing.length === 0) {
      await db.insert(rolePermissions).values({
        role: role as MemberRole,
        permissions,
      });
    } else {
      console.log(`Skipped ${role} (already exists)`);
    }
  }

  console.log('Role permission seeded successfully.');
  process.exit(0);
}

seedRolePermissions().catch((err) => {
  console.error('Role permission seeding failed:', err);
  process.exit(1);
});
