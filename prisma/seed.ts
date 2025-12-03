import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Simple password hashing function (in production, use bcrypt)
function hashPassword(password: string): string {
  // For now, using a simple hash - in production use bcrypt
  return Buffer.from(password).toString('base64');
}

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashPassword('admin123'),
      role: 'admin',
      full_name: 'System Administrator',
      email: 'admin@cpi-training.com',
    },
  });

  console.log('✅ Created admin user:', { username: admin.username, role: admin.role });

  // Create instructor user
  const instructor = await prisma.user.upsert({
    where: { username: 'instructor' },
    update: {},
    create: {
      username: 'instructor',
      password: hashPassword('instructor123'),
      role: 'instructor',
      full_name: 'Training Instructor',
      email: 'instructor@cpi-training.com',
    },
  });

  console.log('✅ Created instructor user:', { username: instructor.username, role: instructor.role });

  console.log('\n📝 Default Credentials:');
  console.log('👤 Admin - Username: admin | Password: admin123');
  console.log('👨‍🏫 Instructor - Username: instructor | Password: instructor123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
