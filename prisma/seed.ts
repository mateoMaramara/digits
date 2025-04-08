import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // ✅ Seed Users
  for (const account of config.defaultAccounts) {
    const role: Role = account.role === 'ADMIN' ? 'ADMIN' : 'USER';
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  // ✅ Seed Contacts
  for (let i = 0; i < config.defaultContacts.length; i++) {
    const contact = config.defaultContacts[i];
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
